const express = require("express");
const path = require("path");
const hbs = require("hbs");
const auth = require("./middlewares/auth");
//cookieParser
var cookieParser = require("cookie-parser");

require("../src/database/mongo/mongodb");

const app = express();

//Get the value
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); //cookieParser

//Routs
const userlogs = require("./routers/userroute"); //user
const profile = require("./routers/profileroute"); //Profile
const task = require("./routers/taskroute"); //for task
const blog = require('./routers/blog')

app.use(userlogs);
app.use(profile);
app.use(task);
app.use(blog)

//Paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const staticPath = path.join(__dirname, "../public");

//handles bar set up
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Use static path
app.use(express.static(staticPath));

//static path setup
hbs.registerPartials(partialsPath);

//middleware for site down
/* app.use((req, res, next)=>{
      res.send('Site will unabmle to get request')
})  */

//Home page

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(process.env.PORT, () => console.log("App is listern on port " + process.env.PORT));

//cookies
// res.cookie("keytestval", '1234');
//res.clearCookie("keytestval");

//================================================================================================================
//relation ship between collection

// const userm = require("./database/model/Usermodel");
// const taskm = require("./database/model/taskmodel");

// async function main() {
  // ---------------------------  task to user details
  // const task = await taskm.findById('5edfa84e769f6e269844c906')
  // await task.populate('owner').execPopulate()
  // console.log(task)
  // console.log(task.owner)
  //----------------------------- user to task details
  //   const user = await userm.findById("5edf94888df91bce5cfd3282");
  //   await user.populate("mytask").execPopulate();
  //   console.log(user.mytask);
  //   console.log(user);
  //
// }

// main();

//================================================================================================================
