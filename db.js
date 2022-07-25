import mongoose from "mongoose";
import { mongoUri } from "./utils/secrets.js";

export function initializeDB() {
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

  