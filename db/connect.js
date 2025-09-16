const mongoose = require("mongoose");
  
let connectDB = (URL) => {
 return mongoose
    .connect(URL)
    .then(() => {
      console.log("Connected to DB...");
    })
    .catch((err) => {
      console.log("Error while connecting to DB" + err);
    });
};
module.exports=connectDB;