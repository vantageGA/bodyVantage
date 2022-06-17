import express from 'express';
import { updateConfirmEmail } from '../controllers/confirmEmailController.js';
import { updateConfirmReviewerEmail } from '../controllers/confirmEmailController.js';

const router = express.Router();
router.route('/verify/token=:id').get(updateConfirmEmail);
router.route('/verifyReviewer/token=:id').get(updateConfirmReviewerEmail);

export default router;
