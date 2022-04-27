import express from 'express';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import ProfileImages from '../models/profileImageModel.js';
import Profile from '../models/profileModel.js';
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

// @description: Post PROFILE Images
// @route: POST /api/profileUpload
// @access: Private

router.post('/', protect, upload.single('profileImage'), async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const result = await cloudinary.uploader.upload(`${req.file.path}`, {
      folder: 'profileImage',
    });

    // Associate the profile image with the user
    const profile = await Profile.find({ user: req.user._id });

    if (!profile) {
      res.status(401);
      throw new Error(`Profile not found`);
    } else {
      //Create a new instance of ProfileImages
      let profileImage = new ProfileImages({
        user: req.user._id,
        name: req.user.name,
        avatar: result.secure_url,
        cloudinaryId: result.public_id,
      });

      //Update the Profile
      profile[0].profileImage = result.secure_url;
      profile[0].cloudinaryId = result.public_id;
      await profile[0].save();

      //Save user profile
      await profileImage.save();
      res.status(200).json(profileImage);
    }
  } catch (error) {
    res.status(401);
    throw new Error(`Image not uploaded...${error}`);
  }
});

export default router;
