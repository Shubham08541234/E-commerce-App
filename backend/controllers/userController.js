import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genToken = (id) => {
  const options = {
    expiresIn: "7d",
  };

  return jwt.sign({ id }, process.env.JWT_SECRET, options);
};

// route for user login
const userLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const iden = email || name;

    const user = await userModel.findOne({ email: iden });

    if (!user) {
      return res.json({ success: false, msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = genToken(user._id);
      return res.json({ success: true,username: user.name, token });
    }
    return res.json({ success: false, msg: "Password wrong" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// route for user register
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if user already exist or not

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({
        success: false,
        message: "user alredy exists, Try login!",
      });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Plese enter a valid email!",
      });
    }

    // validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Plese enter a strong password!",
      });
    }

    const genSalt = await bcrypt.genSalt(10);
    const genPassword = await bcrypt.hash(password, genSalt);

    const newUser = new userModel({
      name,
      email,
      password: genPassword,
    });

    const savedUser = await newUser.save();

    const token = genToken(savedUser._id);

    return res.json({
      success: true,
      message: "resgistered Successfully",
      token,
      savedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user verification
const verifyUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await userModel.findOne(userId)
    return res.json({success: true, username: user.name, message: "User verified"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: email, password: password },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      return res.json({ success: true, message: "admin LogedIn", token });
    }
    return res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { userLogin, userRegister, adminLogin, verifyUser };
