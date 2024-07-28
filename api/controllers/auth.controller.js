import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";

// Route for Registration of New users
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      name: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      isAdult: req.body.isAdult,
      role: req.body.role,
    });

    await newUser.save();
    res.status(200).json({ message: "User has successfully signed Up" });
  } catch (error) {
    next(error);
  }
};
// Route for Login of user

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return next(errorHandler(404, "User Not Found!!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(errorHandler(404, "Invalid Password or email"));
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY
    );

    const { password, isAdmin, ...other } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User has successfully logged out" });
};

export const authenticate = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not Authorised to access this Page" });
  }

  try {
    const tokenCheck = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(tokenCheck.userId);

    if (!user) {
      res
        .status(401)
        .json({ message: "You are not Authorised to access this Page" });
    }
  } catch (error) {
    res.status(401).json({ message: "Authorization Error" }, error);
  }
};
