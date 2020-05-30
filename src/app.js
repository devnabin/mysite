const express = require('express')
const path = require('path')
const hbs = require('hbs')
const auth = require('./auth/auth')
//cookieParser
var cookieParser = require('cookie-parser')



require('../src/database/mongo/mongodb')

const app = express()

//Get the value 
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())   //cookieParser


//Routs
const userlogs = require('./user/userroute') //user
const profile = require('./user/profileroute') //Profile
const task = require('./user/taskroute') //for task


app.use(userlogs)
app.use(profile)
app.use(task)


//Paths
const viewsPath = path.join(__dirname , '../templates/views');
const partialsPath = path.join(__dirname , '../templates/partials');
const staticPath = path.join(__dirname , '../public');



//handles bar set up
app.set('view engine', 'hbs');
app.set("views", viewsPath);


//Use static path
app.use(express.static(staticPath))

//static path setup
hbs.registerPartials(partialsPath)


//middleware for site down
/* app.use((req, res, next)=>{
      res.send('Site will unabmle to get request')
})  */



//Home page

app.get('/' , (req,res)=>{
  // res.render('index');
  res.send({
    Nabin : "nabin"
  })
})





app.listen(3000, ()=> console.log('App is listern on port 3000'));





 //cookies
  // res.cookie("keytestval", '1234');
  //res.clearCookie("keytestval");
  

