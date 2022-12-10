import mongoose from "mongoose";
import User from "../model/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  //   console.log(req.body);
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log("");
      res.status(400).json({ message: "user already exists." });
    } else {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      const user = { firstName, lastName, email, password: hashedPassword };
      const NewUser = new User(user);
      // console.log("NewUser", NewUser);
      const userDBDetails = await NewUser.save();
      //   console.log("userDBdetails: ", userDBDetails);
      const token = jwt.sign(
        { email: userDBDetails.email, id: userDBDetails._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: NewUser, jwtToken: token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
export const signin = async (req, res) => {
  //   console.log(req.body);
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    // console.log("existingUser", existingUser);
    if (!existingUser) {
      res.status(400).json({ message: "User does not exists" });
    } else {
      const actualHashedPassword = existingUser.password;
      if (bcryptjs.compareSync(password, actualHashedPassword)) {
        //jwt tokens
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          result: existingUser,
          jwtToken: token,
        });
      } else res.status(400).json({ message: "invalid password!" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
