const express = require('express')
const path = require('path')
const hbs = require('hbs')
const chalk = require('chalk');
 
console.log(chalk.blue('Hello world!'));
const bodyParser = require('body-parser');

//mangodb
const { MongoClient , } = require('mongodb')
const connectionUrl = "mongodb://127.0.0.1:27017";
const database = 'mysite'
MongoClient.connect(connectionUrl ,{useNewUrlParser: true , useUnifiedTopology:true} , (error , client)=>{
    if(error) return console.log('error , ' , error)

    const db = client.db(database);

    db.collection('userinfo').insertOne({
        Name : 'test',
    },(error, result)=>{
        if(error) return console.log(error , 'Error ')
    
        console.log(chalk.green.inverse('files save successfully'))
    })
})





//mongodb *
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
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/getdata', (req,res)=>{
console.log(req.body.pass);
console.log(req.body.user);

res.send('hello')
})


app.listen(port, () => console.log('app is listing on port  ' + port) )