import express from 'express';
import {
  authUserReview,
  registerUserReviewer,
  getAllUsersReviews,
  deleteReviewer,
} from '../controllers/userReviewsController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/reviewers/admin/:id', protect, admin, getAllUsersReviews);
router.delete('/reviewer/admin/:id', protect, admin, deleteReviewer);
router.post('/users-review/login', authUserReview);
router.post('/users-review', registerUserReviewer);

export default router;
