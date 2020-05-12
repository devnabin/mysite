const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

//Getting data in json
app.use(express.json());


//Routs
const userlogs = require('./user/logs')

app.use(userlogs)


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


//Home page
app.get('/', (req,res)=>{
  res.render('index');
})








app.listen(3000, ()=> console.log('App is listern on port 3000'));