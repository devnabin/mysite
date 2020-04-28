const express = require('express')
const path = require('path')
const hbs = require('hbs')



//To get data from from
const bodyParser = require('body-parser');


const app = express()
const port = process.env.PORT || 3000

//to get data from form this is necessary
app.use(bodyParser.urlencoded({ extended: true }));

//path
const viewsPath = path.join(__dirname , '../templates/views')
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname , '../templates/Partials')


//To locate partials files
hbs.registerPartials(partialsPath)

//To tell public path for static files
app.use(express.static(staticPath));


//set express to use handles bar
app.set('view engine', 'hbs');

//to set the location of views path or hbs path or handlesbar path
app.set('views'  ,viewsPath)


//home page
app.get('', (req,res)=>{
    res.render('index')
})

//login page
app.get('/login', (req,res)=>{
    res.render('login')
})

//Registration page
app.get('/register', (req,res)=>{
    res.render('register')
})


//conformregistration page 
app.post('/register', ({body},res)=>{
    if(!body.username){
     return   res.send('somthing error') 
    } else if(!body.password){
        return   res.send('somthing error') 
    }else if(!body.email){
        return   res.send('somthing error') 
    }
         
    
    res.send('Good')          
    
    // res.render('conformregistration')
})


app.post('/login', (req,res)=>{
console.log(req.body.pass);
console.log(req.body.user);

res.send('hello')
})


app.listen(port, () => console.log('app is listing on port  ' + port) )