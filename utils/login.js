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



module.exports = C