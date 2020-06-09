const moongoose = require("mongoose");
const taskSchema = new moongoose.Schema({
  taskid: {
    type: Number,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  completed: {
    default: false,
    type: Boolean,
    required: true,
  },
  deleted : {
    type: Boolean,
    required: true,
    default : false
  },
  owner : {
    required : true,
    ref : 'user',
    type : moongoose.Schema.Types.ObjectId
  }
});

taskSchema.methods.toJSON = function(){
  const taskObject = this.toObject();
  delete taskObject._id
  return taskObject;
}


const Task = moongoose.model("task", taskSchema);

module.exports = Task;

