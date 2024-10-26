const MessageModel = require("../models/imageDetails");

const getTodaysMessage = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }


    const avatar = await MessageModel.findOne({ email });
    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found" });
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);


    const todayMessages = avatar.messages.filter((message) => {
      const messageDate = new Date(message.date);
      return messageDate >= today && messageDate < tomorrow;
    });

    if (!todayMessages.length) {
      return res.status(404).json({ message: "No messages found for today" });
    }


    const currentTime = new Date();
    let closestMessage = null;
    let closestTimeDiff = Infinity;

    todayMessages.forEach((msg) => {
      const messageTime = new Date();
      messageTime.setHours(msg.time); 
      messageTime.setMinutes(0);
      messageTime.setSeconds(0);

   
      const timeDiff = Math.abs(currentTime - messageTime);
      if (timeDiff < closestTimeDiff) {
        closestTimeDiff = timeDiff;
        closestMessage = msg;
      }
    });

   
    const responseData = {
      username: avatar.username,
      email: avatar.email,
      avatarId: avatar.avatarId,
      imageUrl: avatar.imageUrl,
      gifUrl: avatar.gifUrl,
      videoUrl: avatar.videoUrl,
      message: closestMessage, 
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error retrieving today's messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getTodaysMessage;
