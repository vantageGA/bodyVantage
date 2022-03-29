import express from 'express';
import { sendContactForm } from '../controllers/contactFormController.js';

const router = express.Router();
router.route('/send').post(sendContactForm);

export default router;
