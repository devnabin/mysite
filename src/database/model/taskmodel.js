const moongoose = require('mongoose')
const taskSchema =new moongoose.Schema({
description : {
    required : true,
    type : String,
} ,
completed : {
    default : false ,
    type : String ,
    required : true
}
})

const Task = moongoose.model('task' , taskSchema)


module.exports = Task;