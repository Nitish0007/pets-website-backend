const mongoose =  require("mongoose");
const { mongoUri } = require("./utils/secrets.js");

module.exports = function initializeDB() {
    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Established Mongoose Default Connection");
      })
      .catch((err) => {
        console.error("Mongoose Default Connection Error : " + err);
      });
  }

  