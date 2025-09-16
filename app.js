const connectDB = require("./db/connect");
const express = require("express");
const app = express();

//JSON MiddleWare
app.use(express.json());

//EJS
app.set("view engine", "ejs");

const tasks = require("./routes/tasks");
const home = require("./routes/home");
const error404 = require("./middlewares/404");
const errorHandler = require("./middlewares/errorHandler");

const { default: mongoose } = require("mongoose");

require("dotenv").config();

app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use("/", home);
app.use(error404);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
