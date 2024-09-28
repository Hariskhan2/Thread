const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    //checking if email already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
      //   const salt = await bycrypt.genSalt;
      const hashedPassword = await bcrypt.hash(password, 10);
      const payload = {
        name,
        email,
        profile_pic,
        password: hashedPassword,
      };

      const newUser = new UserModel(payload);
      const userSave = await newUser.save();
      return res
        .status(201)
        .json({
          message: "User created successfully",
          data: userSave,
          success: true,
        });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error " + error, error: true });
  }
}


module.exports= registerUser