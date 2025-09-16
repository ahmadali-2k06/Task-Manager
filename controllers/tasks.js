const asyncWrapper = require("../middlewares/async-wrapper");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/customError");
//All Tasks
const allTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

//single Task
const SingleTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`No task found with id ${req.params.id}`, 404));
  }
  res.status(200).json(task);
});

//Create Task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).send({ task });
});

//Update Task
const updateTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`No task found with id ${id}`, 404));
  }
  await Task.updateOne(
    { _id: req.params.id },
    { name: req.body.name, description: req.body.description },
    { runValidators: true }
  );
  return res.status(200).send({ msg: "Task updated successfully!" });
});
//Update Stage
const updateStage = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`No task found with id ${req.params.id}`, 404));
  }
  await Task.updateOne(
    { _id: req.params.id },
    { $set: { stage: req.body.stage } },
    { runValidators: true }
  );
  return res.status(200).send({ msg: "Task updated successfully!" });
});
//Delete Task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`No task found with id ${req.params.id}`, 404));
  }
  await Task.deleteOne({ _id: req.params.id });
  res.status(200).json({ msg: "Success" });
});
//Home
const renderHome = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  const todoTasks = tasks.filter((task) => task.stage === "To Do");
  const inProgressTasks = tasks.filter((task) => task.stage === "In Progress");
  const doneTasks = tasks.filter((task) => task.stage === "Done");
  res.render("index", {
    todoTasks: todoTasks,
    inProgressTasks: inProgressTasks,
    doneTasks: doneTasks,
  });
});

module.exports = {
  allTasks,
  SingleTask,
  createTask,
  updateTask,
  deleteTask,
  renderHome,
  updateStage,
};
