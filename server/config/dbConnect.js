const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URI).then((result) => {
    console.log("Mongo sb connection successfull 🔥🔥🔥🔥")
}).catch((err) => {
    console.log(error)
});

module.exports = mongoose