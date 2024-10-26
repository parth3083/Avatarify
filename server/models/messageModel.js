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
        type: Date, // Use Date type for easier querying and sorting by date
        required: true,
      },
      time: {
        type: Number, // Stored as hour in 24-hour format (e.g., 13 for 1 PM)
        required: true,
      },
      recurrence: {
        type: String,
        required: true,
        enum: ["once", "daily", "weekly", "monthly"], // Add enums for recurrence
      }
    },
  ],
}, {
  timestamps: true,
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
