const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ==============================
   SIGNUP
============================== */

exports.signup = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Signup failed"
    });

  }

};

/* ==============================
   LOGIN
============================== */

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      "construction_secret",

      { expiresIn: "1d" }

    );

    res.json({

      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }

    });

  } catch (error) {

    res.status(500).json({
      message: "Login failed"
    });

  }

};