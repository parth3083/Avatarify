const UserModel = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      clerkId,
      firstName,
      lastName,
      phoneNumber,
      imageUrl,
    } = req.body;

    const isUserAlreadyExists = await UserModel.findOne({ email });
    if (isUserAlreadyExists) {
      res.status(201).json({
        message: "User already exists",
      });
      return;
    } else {
      const newUser = new UserModel({
        username,
        email,
        clerkId,
        firstName,
        lastName,
        phoneNumber,
        imageUrl,
        createdAt: Date.now(),
      });
      const reponse = await newUser.save();
      console.log(reponse);
      res.status(201).json({
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports =  registerUser;
