import { Request, Response } from "express";
import UserModel from "../models/user";

const userData = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Check if the user exists
    const isUserAlreadyExists = await UserModel.findOne({ email: email });
    if (!isUserAlreadyExists) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Fetch user details
    const userDetails = await UserModel.findOne({ email: email });
    return res.status(200).json(userDetails);  // Set status before json response
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid request parameters" });
  }
};

export default userData;
