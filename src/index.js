const express = require('express')

const app = express()
const Port = process.env.PORT || 3000

app.get('', (req , res)=>{
res.send(
    [
        {
        "id": "1",
        "name": "Bibhu kiju",
        "age": "20"
        },
        
        {
        "id": "2",
        "name": "Nabin bhandari",
        "age": "21"
        },
        
        {
        "id": "3",
        "name": "Ram jonchhen",
        "age": "20"
        },
        
        {
        "id": "4",
        "name": "Bimal Shrestha",
        "age": "21"
        },
        
        {
        "id": "5",
        "name": "Ram jonchhen",
        "age": "20"
        },
        
        {
        "id": "6",
        "name": "Bimal Shrestha",
        "age": "21"
        },
        
        {
        "id": "7",
        "name": "Naarayan Shrestha",
        "age": "20"
        },
        
        {
        "id": "8",
        "name": "Laxman jonchhen",
        "age": "20"
        },
        
        {
        "id": "9",
        "name": "Naarayan Shrestha",
        "age": "20"
        },
        
        {
        "id": "10",
        "name": "Laxman jonchhen",
        "age": "20"
        },
        
        {
        "id": "11",
        "name": "Rabin kiju",
        "age": "15"
        },
        
        {
        "id": "14",
        "name": "birat kiju",
        "age": "19"
        }
        ]
        
)
})

app.listen(Port , ()=> console.log('app is listen in Port 3000'))