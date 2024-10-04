import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./config/dbConnect";
import registerUser from "./routes/userRegsiter";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working ");
});

app.post("/register-user",registerUser)

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
