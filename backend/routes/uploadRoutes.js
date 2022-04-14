import express from 'express';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import ProfileImages from '../models/profileImageModal.js';
import User from '../models/userModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// NB!! This name 'profileImage' must match the name of the attribute in the upload form.
router.post('/', protect, upload.single('profileImage'), async (req, res) => {
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
      //Create a new instance of profileImages

      let profileImage = new ProfileImages({
        user: req.user._id,
        name: req.user.name,
        avatar: result.secure_url,
        cloudinaryId: result.public_id,
      });

      //Update the user
      user.profileImage = result.secure_url;
      user.cloudinaryId = result.public_id;
      await user.save();

      //Save user profile
      await profileImage.save();
      res.status(200).json(profileImage);
    }
  } catch (error) {
    res.status(401).json(error);
    throw new Error(`Image not uploaded. ${error}`);
  }
});

export default router;
