const UserModel = require("../models/user");

const fetchUserDetails = async (req, res) => {
  try {
    const { email } = req.query;
    const isUserAlreadyExists = await UserModel.findOne({ email });
    if (!isUserAlreadyExists) {
      return res.status(401).json({ message: "User doesnot exists" });
    }
    const userDetails = await UserModel.findOne({ email });
    return res.status(200).json({
      data: userDetails,
    });
  } catch (error) {
    // console.error(error);
    return res.status(400).json({ message: "Server error" });
  }
};

module.exports = fetchUserDetails;
