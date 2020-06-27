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
postowner:{
type : String,
required: true
},
owner : {
    type :mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true
}
},{
    timestamps: true,
  });


//New Method to hideing private data
blogSchema.methods.toJSON = function () {
    //.tojson method will be call automatically call
    const user = this;
    const userObject = user.toObject(); //to object is a way to copy raw data
    delete userObject.pic;
    delete userObject.owner;
    return userObject;
  };

const blog = mongoose.model('blogs' , blogSchema)

module.exports = blog