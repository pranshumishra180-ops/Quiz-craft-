const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message:
          "You cannot delete yourself",
      });
    }

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role =
      user.role === "student"
        ? "admin"
        : "student";

    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateRole,
};