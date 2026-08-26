const User = require("../models/User");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Profile
// Update Profile
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      country,
      preferredLanguage,
      profileImage,
      bio,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.country = country ?? user.country;
    user.preferredLanguage =
      preferredLanguage ?? user.preferredLanguage;
    user.profileImage = profileImage ?? user.profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        preferredLanguage: user.preferredLanguage,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};