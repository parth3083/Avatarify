import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./config/dbConnect";
import registerUser from "./routes/userRegsiter"; // Ensure this path is correct
import { AvatarDetails } from "./routes/avatarGeneration"; // Ensure this path is correct
import fetchUserDetails from "./routes/fetchingUserData"; // Ensure this path is correct
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to the database
connectDb();

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working");
});

// Register user route
app.post("/register-user", registerUser);

// Avatar details route
app.use("/details", AvatarDetails);

 // Make sure to use POST for fetching details

// Start the server
app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
