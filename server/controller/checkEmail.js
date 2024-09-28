const UserModel =require("../models/UserModel")


async function checkEmail(req, res) {
  try {
    const { email } = req.body;
    //checking if email already exists
    const user = await UserModel.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: "This user does not exist",
        error: true,
      });
    }
    return res
    .status(200)
    .json({
      message: "Email verifies successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports=checkEmail 