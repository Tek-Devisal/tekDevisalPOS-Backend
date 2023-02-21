const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

module.exports = (db_name) => {
  // return mongoose.connect(
  //   `${process.env.DB_URI}`,
  //   () => {
  //     console.log("MongoDB Connection Successful");
  //   },
  //   (e) => console.error(e)
  // );
  return mongoose.connect(
    `mongodb://localhost/${db_name}`,
    () => {
      console.log("MongoDB Connection Successful");
    },
    (e) => console.error(e)
  );
};
