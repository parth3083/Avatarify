const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatarId: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    gifUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: Number,
          required: true,
        },
        recurrence: {
          type: String,
          required: true,
          enum: ["once", "daily", "weekly", "monthly"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AvatarModel = mongoose.model("AvatarDetails", avatarSchema);

module.exports = AvatarModel;
