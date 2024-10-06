import express, { Request, Response } from "express";
import UserModel from "../models/user";
import upload from "../config/multerConfig";

const router = express.Router();

router.post(
  "/getdetails",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { email, time, selectedDate, message } = req.body;
      console.log(email);
      console.log(time);
      console.log(selectedDate);
      console.log(message);

      const user = await UserModel.findOne({ email });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as AvatarDetails };
