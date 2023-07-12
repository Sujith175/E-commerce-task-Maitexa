const mongoose = require("");

const databaseConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://sujithkumarsk175:${process.env.MONGOPASS}@cluster0.5gxx08s.mongodb.net/`
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = databaseConnect;
