const express = require('express')
const path = require('path')
const hbs = require('hbs')
const chalk = require('chalk');
console.log(chalk.blue('Hello world!'));
const bodyParser = require('body-parser');


const app = express()
const port = process.env.PORT || 3000


//path
const viewsPath = path.join(__dirname , '../templates/views')
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname , '../templates/Partials')
console.log(staticPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath));

app.set('view engine', 'hbs');
app.set('views'  ,viewsPath)



app.get('', (req,res)=>{
    res.render('index' , {
         name : 'Nabin'
    })
})
app.get('/login', (req,res)=>{
    res.render('login' , {
         name : 'Nabin'
    })
})
app.get('/register', (req,res)=>{
    res.render('register', {
         name : 'Nabin'
    })
})
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/getdata', (req,res)=>{
console.log(req.body.pass);
console.log(req.body.user);

res.send('hello')
})


app.listen(port, () => console.log('app is listing on port  ' + port) )