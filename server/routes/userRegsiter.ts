import { Request, Response } from "express";
import UserModel from "../models/user";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, clerkId } = req.body;

    const isUserAlreadyExists = await UserModel.find({ email: email });

    if (isUserAlreadyExists) {
      res.status(201).json({ message: "User already exists" });
    } else {
      const newUser = new UserModel({
        username,
        email,
        clerkId,
        createdAt: Date.now(),
      });
      const response = await newUser.save();
      console.log(response);
      res.status(200).json({ message: "Usersave sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;
