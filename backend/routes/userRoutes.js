import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
  getUserProfileById,
  deleteUser,
  updateIsAdmin,
  userForgotPassword,
  updateUserProfilePassword,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/users/login', authUser);
router
  .route('/users/:id')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, admin, deleteUser);

router
  .route('/user/profile/:id')
  .get(getUserProfileById)
  .put(protect, admin, updateIsAdmin);

router
  .route('/users')
  .post(registerUser)
  .get(protect, admin, getAllUsersProfile);

router.route('/user-forgot-password').post(userForgotPassword);
router.route('/user-update-password').put(updateUserProfilePassword);

export default router;
