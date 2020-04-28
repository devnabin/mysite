const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionUrl = "mongodb://127.0.0.1:27017";
const database = 'mysite'


const adduser = (username , password , email)=>{
MongoClient.connect(connectionUrl , {useNewUrlParser : true , useUnifiedTopology: true}  , (error , client)=>{
   if(error) return console.log('Unable to connect to the data base')
const db = client.db(database)
db.collection('user').insertOne({

})

})
}