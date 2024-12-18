const UserModel = require("../models/user");

const updateUserDetails = async (req, res) => {
  try {
    const { email, state, city, address, country } = req.body;
  
    const isUserAlreadyExists = await UserModel.findOne({ email });
    if (!isUserAlreadyExists) {
      return res.status(401).json({ message: "User doen not exist" });
    }
    const updateUserDetails = await UserModel.findOneAndUpdate(
      { email },
      {
        country,
        state,
        city,
        address,
       
      },
      { new: true }
    );

    // console.log(updateUserDetails);
    return res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Internal server error" });
  }
};

module.exports = updateUserDetails;
