const { spawn } = require("child_process");
const path = require("path");
const messageModel = require("../models/messageModel");
const UserModel = require("../models/user");

const userMessages = async (req, res) => {
  const { messages, email } = req.body;

  const isUserAlreadyExist = await UserModel.findOne({ email });

  if (!isUserAlreadyExist) {
    return res.status(401).json({ message: "User does not exist" });
  }

  console.log("Messages received:", messages);

  const python = spawn("python", [path.join(__dirname, "../utils/audio.py")]);

  python.stdin.write(JSON.stringify(messages));
  python.stdin.end();

  python.stdout.on("data", (data) => {
    console.log(`Python stdout: ${data.toString()}`);
  });

  python.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data.toString()}`);
  });

  python.on("close", async (code) => {
    console.log(`Python script exited with code ${code}`);
    if (code === 0) {
      try {
        for (let i = 0; i < messages.length; i++) {
          const messageUpdate = {
            message: messages[i].message,
            date: messages[i].date,
            time: messages[i].time,
            recurrence: messages[i].recurrence,
          };
          await messageModel.findOneAndUpdate(
            { email },
            { $push: { messages: messageUpdate } },
            { new: true, upsert: true }
          );
        }

        return res
          .status(200)
          .json({ message: "Messages updated successfully!" });
      } catch (error) {
        console.error("Error updating MongoDB:", error);
        return res
          .status(500)
          .json({ error: "Failed to update data in MongoDB." });
      }
    } else {
      return res.status(500).json({ error: "TTS conversion failed." });
    }
  });
};
module.exports = userMessages;



// Cortana give me the code for the model this is the final model means it will store each and everything first of all the model will contain the username it will contain the email id now this both user name and email id will come from already present model that is the user model now then it will use this image model that you just give me right now from that I will take the image url and I will take the gif url and there is also one model name as the messages model I will provide you the code of messages model and from the messages model what I want to take is the what messages user has sent the date the time and the occurrence of the message and now there is also one more thing that is the video so I will also upload that video from the Claudinary and you have to store the final videos secure url into the model and hereby I am providing you the code of all three models : 