const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const upload = require("../config/multerConfig");
const cloudinary = require("../config/cloudinaryConfig");
const UserModel = require("../models/user");
const MessageModel = require("../models/messageModel");
const AvatarModel = require("../models/imageDetails");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(402).json({ message: "No file uploaded" });
    }

    const { email, avatarID } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // console.log(`Email: ${email}`);
    // console.log(`Avatar ID: ${avatarID}`);

    const imagePath = path.join(__dirname, "../uploads", file.filename);

    if (avatarID == 1) {
      const pythonProcess = spawn("python", [
        path.join(__dirname, "../utils/gifCreator.py"),
        imagePath,
      ]);

      pythonProcess.on("close", (code) => {
        console.log(`gifCreator.py process exited with code ${code}`);
        runCombineAndAudioLength(req, res);
      });
    } else if (avatarID == 2) {
      const genderPredictor = spawn("python", [
        path.join(__dirname, "../utils/genderPredict.py"),
        imagePath,
      ]);

      genderPredictor.stdout.on("data", (data) => {
        const gender = data.toString().trim();
        // console.log(`Predicted gender: ${gender}`);

        const genderValue = gender === "man" ? 1 : 2;

        const faceSwapProcess = spawn("python", [
          path.join(__dirname, "../utils/faceSwapping.py"),
          imagePath,
          genderValue.toString(),
        ]);

        faceSwapProcess.on("close", (code) => {
          // console.log(`faceSwapping.py exited with code ${code}`);

          const gifCreationProcess = spawn("python", [
            path.join(__dirname, "../utils/Gifcreation.py"),
          ]);

          gifCreationProcess.on("close", (code) => {
            // console.log(`Gifcreation.py exited with code ${code}`);
            runCombineAndAudioLength(req, res);
          });
        });
      });
    }
  } catch (error) {
    // console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

async function runCombineAndAudioLength(req, res) {
  const combineProcess = spawn("python", [
    path.join(__dirname, "../utils/combine_GIF_and_Audio.py"),
  ]);
  const audioLengthProcess = spawn("python", [
    path.join(__dirname, "../utils/audioFileLength.py"),
  ]);

  combineProcess.on("close", async (code) => {
    console.log(`combine_GIF_and_Audio.py exited with code ${code}`);

    try {
      const imagePath = path.join(__dirname, "../uploads");
      const gifPath = path.join(__dirname, "../GIF");
      const videoPath = path.join(__dirname, "../output");
      const audioPath = path.join(__dirname, "../audio");

      // console.log(imagePath);
      // console.log(gifPath);
      // console.log(videoPath);

      const imageFiles = fs.readdirSync(imagePath);
      const gifFiles = fs.readdirSync(gifPath);
      const videoFiles = fs.readdirSync(videoPath);
      const audioFiles = fs.readdirSync(audioPath);

      // console.log(`Image Files: ${imageFiles}`);
      // console.log(`GIF Files: ${gifFiles}`);
      // console.log(`Video Files: ${videoFiles}`);

      if (!imageFiles.length || !gifFiles.length || !videoFiles.length) {
        return res
          .status(500)
          .json({ message: "Required files not found for upload" });
      }

      const imageFile = imageFiles[0];
      const gifFile = gifFiles[0];
      const videoFile = videoFiles[0];

      const imageUpload = await cloudinary.uploader.upload(
        path.join(imagePath, imageFile),
        { resource_type: "image" }
      );
      // console.log("Image uploaded:", imageUpload.secure_url);

      const gifUpload = await cloudinary.uploader.upload(
        path.join(gifPath, gifFile),
        { resource_type: "image" }
      );
      // console.log("GIF uploaded:", gifUpload.secure_url);

      const files = fs.readdirSync(videoPath);

      const videoUrls = [];

      // Loop through and upload each file to Cloudinary
      for (const file of files) {
        const uploadResponse = await cloudinary.uploader.upload(
          path.join(videoPath, file),
          { resource_type: "video" }
        );
        console.log(`Uploaded ${file}:`, uploadResponse.secure_url);

        // Add the secure URL to the array
        videoUrls.push(uploadResponse.secure_url);
      }
      // console.log("Video uploaded:", videoUpload.secure_url);

      const { email, avatarID } = req.body;
      const user = await UserModel.findOne({ email });
      const messageData = await MessageModel.findOne({ email });

      if (!user || !messageData) {
        return res
          .status(404)
          .json({ message: "User or message data not found" });
      }

      const todayDate = getTodayDate();

      const todaysMessages = messageData.messages.filter((msg) => {
        const msgDate = new Date(msg.date);
        return (
          msgDate.getFullYear() === todayDate.getFullYear() &&
          msgDate.getMonth() === todayDate.getMonth() &&
          msgDate.getDate() === todayDate.getDate()
        );
      });

      const avatarData = new AvatarModel({
        username: user.username,
        email: user.email,
        avatarId: avatarID,
        imageUrl: imageUpload.secure_url,
        gifUrl: gifUpload.secure_url,
        videoUrl: videoUrls,
        messages: todaysMessages,
      });

      await avatarData.save();

      fs.unlinkSync(path.join(imagePath, imageFile));
      fs.unlinkSync(path.join(gifPath, gifFile));
      const videoFolder = fs.readdirSync(videoPath);

      for (const file of videoFolder) {
        const filePath = path.join(videoPath, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
      }

      if (audioFiles.length > 0) {
        audioFiles.forEach((file) => {
          fs.unlink(path.join(audioPath, file), (err) => {
            if (err) console.error(`Error deleting audio file ${file}:`, err);
            else console.log(`Deleted audio file ${file}`);
          });
        });
      }

      return res
        .status(200)
        .json({ message: "Files uploaded and saved successfully" });
    } catch (error) {
      console.error(
        "Error uploading to Cloudinary or saving to database:",
        error
      );
      return res.status(500).json({ message: "Internal server error" });
    }
  });
}

module.exports = router;
