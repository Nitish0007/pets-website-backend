const dotenv = require("dotenv");
dotenv.config();

module.exports.mongoUri = process.env.MONGO_URI;
module.exports.PORT = process.env.PORT || 8000;
module.exports.jwtSecret = process.env.jwtSecret;
