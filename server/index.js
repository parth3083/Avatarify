const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const registerUser = require("./routes/userRegistration");
const fetchUserDetails = require("./routes/fetchingUserData");
const updateUserDetails = require("./routes/updateUserDetails");
const uploadImage = require("./routes/handleUploadedImage");
const userMessages = require("./routes/userMessages");
const fetchAvatarDetails = require("./routes/fetchAvatarDetails");

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
app.get("/fetch-details", fetchUserDetails);
app.post("/update-details", updateUserDetails);
app.use("/image-details", uploadImage);
app.post("/upload-message", userMessages);
app.get("/fetch", fetchAvatarDetails);

app.listen(process.env.PORT, () => {
  console.log("http://localhost:8000");
});
