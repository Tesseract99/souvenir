import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemon from "nodemon";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To Memories");
});
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

//&w=majority
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server listening on PORT: ${PORT}`));
  })
  .catch((err) => console.log(err.message));
