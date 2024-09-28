const UserModel = require("../models/UserModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
  try {

    const { userId, password } = req.body;

    const user = await UserModel.findById( userId );
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Login with proper credentials!" });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const cookiesOption = {
      http: true,
      secure: true,
    };
    res.status(200).cookie("token", token, cookiesOption).json({
      message: "Login Successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
