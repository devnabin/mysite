const express = require("express");
const path = require("path");
const hbs = require("hbs");
var randomstring = require("randomstring");

/* const register = require("../utils/register");
const login = require("../utils/login");
 */

//To get data
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

//to get data from form this is necessary
app.use(bodyParser.urlencoded({ extended: true }));

//path
const viewsPath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/Partials");

//To locate partials files
hbs.registerPartials(partialsPath);

//To tell public path for static files
app.use(express.static(staticPath));

//set express to use handles bar
app.set("view engine", "hbs");

//to set the location of views path or hbs path or handlesbar path
app.set("views", viewsPath);

//home page
app.get("", (req, res) => {
  res.render("index");
});

//login page
app.get("/login", (req, res) => {
  res.render("login");
});

//login response
app.post("/login", ({body}, res) => {

login(body.username , body.password , (respo)=>{
 res.send(respo)
})
});

//Registration page
app.get("/register", (req, res) => {
  res.render("register");
});

//conformregistration page
app.post("/register", ({ body }, res) => {
  if (!body.username || !body.password || !body.email)
    return res.send("somthing error");
  if (register(body.username, body.password, body.email))
    res.render("conformregistration" , {
      check : randomstring.generate(7),
    });
});






//
app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not Found",
  });
});

app.listen(port, () => console.log("app is listing on port  " + port));
