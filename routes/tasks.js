const express = require("express");
const app = express();
const {
  allTasks,
  SingleTask,
  createTask,
  updateTask,
  deleteTask,
  updateStage,
} = require("../controllers/tasks");
const router = express.Router();
router.route("/").get(allTasks).post(createTask);
router.route("/:id").get(SingleTask).patch(updateTask).delete(deleteTask);
router.route("/stage/:id").patch(updateStage);
module.exports = router;
