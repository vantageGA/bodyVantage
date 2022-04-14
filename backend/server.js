import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import contactFormRoutes from './routes/contactFormRoutes.js';
import userRoutes from './routes/userRoutes.js';
import confirmEmailRoutes from './routes/confirmEmailRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import imageUploaderRoutes from './routes/imageUploadRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import authUserReview from './routes/userReviewRoutes.js';
import userReviewRoutes from './routes/userReviewRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // This needed to accept json data

//Routes
app.use('/api', confirmEmailRoutes);
app.use('/api', contactFormRoutes);
app.use('/api', userRoutes);
app.use('/api', imageUploaderRoutes);
// Profiles Routes
app.use('/api', profileRoutes);
// User Review routes
app.use('/api', authUserReview);
// User REVIEWER routes
app.use('/api', userReviewRoutes);
//Profile Image upload rout
app.use('/api', imageUploaderRoutes);

//create static folder
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running in  Development or there was an error');
  });
}

// @Error handling middleware
app.use(notFound);
app.use(errorHandler);
// @Error handling middleware

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} and you are running in ${MODE}`,
  ),
);
