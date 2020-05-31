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
});

const Task = moongoose.model("task", taskSchema);

module.exports = Task;
