const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      },
      recurrence: {
        type: String,
        required: true,
      },
    },
  ],
});


const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
