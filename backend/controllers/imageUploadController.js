import asyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary';
import UserProfileImages from '../models/imageUploadModal.js';
import ProfileImages from '../models/profileImageModel.js';
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

// @description: Delete a single PROFILE Image
// @route: DELETE /api/profile-image/:id
// @access: PRIVATE
const deleteProfileImage = asyncHandler(async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const profileImages = await ProfileImages.find({
      user: req.user._id.toString(),
    });

    const profile = profileImages.filter((profile) => {
      if (profile._id.toString() === req.params.id) {
        return profile;
      }
    });

    if (profile) {
      // Removing image from cloudinary
      await cloudinary.uploader.destroy(`${profile[0].cloudinaryId}`);
      // Removing from profile Image model
      await profile[0].remove();
      res.json({ message: 'Profile Image successfully removed' });
    } else {
      res.status(404);
      throw new Error('Profile Not Found');
    }
  } catch (error) {
    res.status(401).json(error);
    throw new Error(`Image not DELETED. ${error}`);
  }
});

export { userProfileImageUpload, deleteProfileImage };
