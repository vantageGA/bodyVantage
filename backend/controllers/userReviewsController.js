import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import UserReviewer from '../models/userReviewerModel.js';
import nodemailer from 'nodemailer';

// @description: Get All the user REVIEWS
// @route: GET /api/reviewers/admin
// @access: Admin
const getAllUsersReviews = asyncHandler(async (req, res) => {
  const reviewers = await UserReviewer.find({});
  if (reviewers) {
    res.json(reviewers);
  } else {
    res.status(404);
    throw new Error('No reviewers found');
  }
});

// @description: Get All the user REVIEWS
// @route: GET /api/reviewers
// @access: public
const getAllUsersReviewers = asyncHandler(async (req, res) => {
  const reviewer = await await UserReviewer.findById(req.params.id);
  if (reviewer) {
    res.json(reviewer);
  } else {
    res.status(404);
    throw new Error('No reviewer found');
  }
});

// @description: Delete a single reviewer
// @route: DELETE /api/reviewer/admin/:id
// @access: PRIVATE/Admin
const deleteReviewer = asyncHandler(async (req, res) => {
  const reviewer = await UserReviewer.findById(req.params.id);
  if (reviewer) {
    await reviewer.remove();
    res.json({ message: 'Reviewer successfully removed' });
  } else {
    res.status(404);
    throw new Error('Reviewer Not Found');
  }
});

// @description: Authenticate a user for a REVIEW and get a token
// @route: POST /api/user-reviews/login
// @access: Public
const authUserReview = asyncHandler(async (req, res) => {
  const { email, password, userProfileId } = req.body;
  const user = await UserReviewer.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userProfileId: userProfileId, // This is the id of the profile of the trainer
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user name or password.');
  }
});

// @description: Register new userReviewer
// @route: POST /api/user-reviews
// @access: Public
const registerUserReviewer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await UserReviewer.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const userReviewer = await UserReviewer.create({
    name: name,
    email: email,
    password: password,
    isConfirmed: false,
    hasSubmittedReview: false,
  });

  if (userReviewer) {
    res.status(201).json({
      _id: userReviewer._id,
      name: userReviewer.name,
      email: userReviewer.email,
      isConfirmed: userReviewer.isConfirmed,
      hasSubmittedReview: userReviewer.hasSubmittedReview,
      token: generateToken(userReviewer._id),
    });

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PW,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const link = `${
      process.env.MAILER_LOCAL_URL
    }api/verifyReviewer/token=${generateToken(userReviewer._id)}`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Body Vantage" <info@bodyvantage.co.uk>', // sender address
      to: `${userReviewer.email}`, // list of receivers
      bcc: 'info@bodyvantage.co.uk',
      subject: 'Body Vantage Reviewer Registration', // Subject line
      text: 'Body Vantage Reviewer Registration', // plain text body
      html: `
  <h1>Hi ${userReviewer.name}</h1>
  <p>You have successfully registered to write a review for a client with Body Vantage</p>
  <p>Please Click on the link to verify your email.</p>
  <br>
  <h4>Please note, in order to get full functionality you must confirm your mail address with the link below.</h4>
  <a href=${link} id='link'>Click here to verify</a>
  <p>Thank you. Body Vantage management</p>
      
   
  `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } else {
    res.status(400);
    throw new Error('Invalid userReviewer data');
  }
});

export {
  getAllUsersReviews,
  getAllUsersReviewers,
  deleteReviewer,
  authUserReview,
  registerUserReviewer,
};
