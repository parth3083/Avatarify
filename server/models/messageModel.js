const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Keep unique if you want only one user per username
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
  },
  messages: [{
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
  }],
});

// Create a model based on the schema
const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
