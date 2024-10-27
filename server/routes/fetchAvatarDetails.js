const MessageModel = require("../models/imageDetails");

const getTodaysMessage = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const avatar = await MessageModel.findOne({ email }).sort({
      updatedAt: -1,
      createdAt: -1,
    });

    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayMessages = avatar.messages
      .filter((message) => {
        const messageDate = new Date(message.date);
        return messageDate >= today && messageDate < tomorrow;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
      );

    if (!todayMessages.length) {
      return res.status(404).json({ message: "No messages found for today" });
    }

    const latestMessage = todayMessages[todayMessages.length - 1];

    const responseData = {
      _id: avatar._id,
      username: avatar.username,
      email: avatar.email,
      avatarId: avatar.avatarId,
      imageUrl: avatar.imageUrl,
      gifUrl: avatar.gifUrl,
      videoUrl: avatar.videoUrl,
      message: latestMessage,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error retrieving today's messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getTodaysMessage;
