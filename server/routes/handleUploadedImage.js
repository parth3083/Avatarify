const imageDetails = require("../models/imageDetails");
const upload = require("../config/multerConfig");
const express = require("express");
const UserModel = require("../models/user");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
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

        // Image path in uploads folder
        const imagePath = path.join(__dirname, '../uploads', file.filename);

        // Check avatarID
        if (avatarID == 1) {
            // Spawn the "gif_creator.py" script
            const pythonProcess = spawn('python', [path.join(__dirname, '../utils/gifCreator.py'), imagePath]);
            pythonProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            pythonProcess.on('close', (code) => {
                console.log(`gif_creator.py process exited with code ${code}`);
                // Always run combine_gif_and_audio.py and audio_length.py
                runCombineAndAudioLength();
            });
        } else if (avatarID == 2) { // Run gender prediction only for avatarID 2
            // Spawn the "gender_predictor.py" script
            const genderPredictor = spawn('python', [path.join(__dirname, '../utils/genderPredict.py'), imagePath]);
            genderPredictor.stdout.on('data', (data) => {
                const gender = data.toString().trim();
                console.log(`Predicted gender: ${gender}`);
              handleGender(gender, avatarID);
              runCombineAndAudioLength();
            });

            genderPredictor.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
        } else if (avatarID == 3) { // Do not run gender prediction for avatarID 3
            // This block is intentionally left blank or could contain other logic for avatarID 3
            // Spawn the "image_animation.py" script
            const imageAnimationProcess = spawn('python', [path.join(__dirname, '../utils/imageAnimation.py'), imagePath]);
            imageAnimationProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            imageAnimationProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            imageAnimationProcess.on('close', (code) => {
                console.log(`image_animation.py process exited with code ${code}`);
                // Always run combine_gif_and_audio.py and audio_length.py
                runCombineAndAudioLength();
            });
        }

        return res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Function to handle gender and avatarID
function handleGender(gender, avatarID) {
  const resourcesDir = path.join(__dirname, '../resources');
  const gifDir = path.join(__dirname, '../GIF');

  // Ensure the directories exist
  if (!fs.existsSync(resourcesDir)) {
      console.error(`Resources directory does not exist: ${resourcesDir}`);
      return;
  }

  if (!fs.existsSync(gifDir)) {
      console.error(`GIF directory does not exist: ${gifDir}`);
      return;
  }

  // Determine the appropriate GIF based on gender and avatarID
  if (avatarID == 2) {
      const selectedGif = gender === 'man' ? 'man_speaking.gif' : 'woman_speaking.gif';
      const sourceGif = path.join(resourcesDir, selectedGif);
      const destinationGif = path.join(gifDir, selectedGif);

      // Check if the source GIF exists
      if (!fs.existsSync(sourceGif)) {
          console.error(`Source GIF does not exist: ${sourceGif}`);
          return;
      }

      // Copy the selected GIF to the GIF folder with error handling
      try {
          fs.copyFileSync(sourceGif, destinationGif);
          console.log(`Copied GIF from ${sourceGif} to ${destinationGif}`);
      } catch (err) {
          console.error(`Error copying file: ${err}`);
      }
  } else {
      console.log(`No action taken for avatarID: ${avatarID}`);
  }
}

// Function to run combine_gif_and_audio.py and audio_length.py
function runCombineAndAudioLength() {
    const combineProcess = spawn('python', [path.join(__dirname, '../utils/combine_GIF_and_Audio.py')]);
    const audioLengthProcess = spawn('python', [path.join(__dirname, '../utils/audioFileLength.py')]);

    combineProcess.stdout.on('data', (data) => {
        console.log(`Combine GIF and audio output: ${data}`);
    });

    audioLengthProcess.stdout.on('data', (data) => {
        console.log(`Audio length output: ${data}`);
    });

    combineProcess.stderr.on('data', (data) => {
        console.error(`Combine error: ${data}`);
    });

    audioLengthProcess.stderr.on('data', (data) => {
        console.error(`Audio length error: ${data}`);
    });

    combineProcess.on('close', (code) => {
        console.log(`combine_gif_and_audio.py process exited with code ${code}`);
    });

    audioLengthProcess.on('close', (code) => {
        console.log(`audio_file_length.py process exited with code ${code}`);
    });
}

module.exports = router;


