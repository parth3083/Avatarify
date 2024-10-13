const mongoose = require("mongoose");

const imageDetails = new mongoose.Schema({
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
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  gifUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  selectedAvatarId: {
    type: Number,
    require: true,
    unique: true,
  },
});

const ImageModel = mongoose.model("Image-Details", imageDetails);
module.exports = ImageModel;
