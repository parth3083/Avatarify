const imageDetails = require("../models/imageDetails");
const upload = require("../config/multerConfig");
const express = require("express");
const UserModel = require("../models/user");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file
    if (!file) {
      return res.status(402).json({ message: "No file uploaded" });
    }
    const { email, avatarID } = req.body;
    const isUserAlreadyExists = await UserModel.findOne({ email });
    if (!isUserAlreadyExists) {
      return res.status(401).json({ message: "User does not exist" });
    }
    console.log(email);
      console.log(avatarID);
      return res.status(200).json({ message:"File uploaded successfully"})
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
