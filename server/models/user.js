const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
      clerkId: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
        unique: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        unique: true,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      dateOfBirth: {
        type: Date,
      },
      dateOfAnniversary: {
        type: Date,
      },
      address: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel