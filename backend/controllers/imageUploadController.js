import asyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary';
import UserProfileImages from '../models/imageUploadModal.js';
import User from '../models/userModel.js';

// @description: Post USER Profile Images
// @route: POST /api/profileUpload
// @access: Private
const userProfileImageUpload = asyncHandler(async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const result = await cloudinary.uploader.upload(`${req.file.path}`, {
      folder: 'profile',
    });

    // Associate the profile image with the user
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(401);
      throw new Error(`User not found`);
    } else {
      //Create a new instance of UserProfileImages

      let profileImage = new UserProfileImages({
        user: req.user._id,
        name: req.user.name,
        avatar: result.secure_url,
        cloudinaryId: result.public_id,
      });

      //Update the user
      user.profileImage = result.secure_url;
      user.cloudinaryId = result.public_id;
      await user.save();
      res.status(200).json(user);

      //Save user profile
      await profileImage.save();
      res.status(200).json(profileImage);
    }
  } catch (error) {
    res.status(401).json(error);
    throw new Error(`Image not uploaded. ${error}`);
  }
});

export { userProfileImageUpload };
