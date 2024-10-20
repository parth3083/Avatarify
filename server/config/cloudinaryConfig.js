const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NOTES_UPLOAD_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_NOTES_UPLOAD_API_KEY,
  api_secret: process.env.CLOUDINARY_NOTES_UPLOAD_SECRET,
});

module.exports = cloudinary;