const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listeneing on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });


