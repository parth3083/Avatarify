import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./config/dbConnect";
import registerUser from "./routes/userRegsiter"; 
import { AvatarDetails } from "./routes/avatarGeneration"; 


require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to the database
connectDb();

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working");
});

// User registration route
app.post("/register-user", registerUser);

// Avatar details route
app.use("/details", AvatarDetails);

// Fetch user data route using the router


// Start the server
app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
