const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const registerUser = require("./routes/userRegistration");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Backend started working!!!");
});
app.post("/register-user", registerUser);
app.listen(process.env.PORT, () => {
  console.log("http://localhost:8000");
});
