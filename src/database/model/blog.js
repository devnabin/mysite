const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
heading : {
    type : String,
    required : true
},
description : {
    type : String, 
    required : true,
},
pic  : {
    type : Buffer,
    required : true,
},
owner : {
    type :mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true
}
},
{
    Timestamp : true
}
)


const blog = mongoose.model('blogs' , blogSchema)

module.exports = blog