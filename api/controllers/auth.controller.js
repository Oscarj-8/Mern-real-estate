import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created Successfuly");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};
