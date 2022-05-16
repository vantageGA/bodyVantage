import express from 'express';
import {
  getAllProfiles,
  getAllProfilesAdmin,
  getProfileById,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  createProfileReview,
  updateProfileQualificationToTrue,
  deleteReview,
  updateProfileClicks,
  getAllProfileImages,
} from '../controllers/profileController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profiles').get(getAllProfiles).post(protect, createProfile);
router.route('/profiles/:id/reviews').post(protect, createProfileReview);

router.route('/profile/:id').get(getProfileById).put(protect, updateProfile);

router.route('/profile').get(protect, getProfile);
// UPDATE number of profile clicks
router.route('/profile-clicks').put(updateProfileClicks);

//Get all profiles ADMIN route
router
  .route('/profiles/admin/:id')
  .get(protect, admin, getAllProfilesAdmin)
  .delete(protect, admin, deleteProfile)
  .put(protect, admin, updateProfileQualificationToTrue);

//Delete a single review route
router.route('/profile/review/admin/:id').delete(protect, admin, deleteReview);

// GET all profile images
router.route('/profile-images').get(protect, getAllProfileImages);

export default router;
