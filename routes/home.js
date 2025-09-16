const express = require("express");
const router = express.Router();
const { renderHome } = require("../controllers/tasks");

router.route("/").get(renderHome);
module.exports = router;
