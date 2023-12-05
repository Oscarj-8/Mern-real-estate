import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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

export const signin = async (res, req, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = await bcrypt.compareSync(
      password,
      validPassword.password
    );
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
  } catch (error) {
    next(error);
  }
};
