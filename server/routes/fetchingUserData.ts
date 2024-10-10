import { Request, Response } from "express";
import UserModel from "../models/user"; // Ensure this path is correct

const fetchUserDetails = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; 
    const userExists = await UserModel.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = await UserModel.findOne({ email });
    console.log(userDetails);
    return res.status(200).json(userDetails); // Make sure to return the response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" }); // Handle errors appropriately
  }
};

export default fetchUserDetails;
