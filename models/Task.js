/** @type {import('mongoose').Model} */
const mongoose = require("mongoose");
const { type } = require("os");
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide name"],
    trim: true,
    maxlength: [30, "The name must be less than 30 characters"],
  },
  stage: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  description: {
    type: String,
    required:true,
    trim:true,
    maxlength:120
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
