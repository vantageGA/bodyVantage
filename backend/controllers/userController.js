import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';

// @description: Get All the users Profiles
// @route: GET /api/users
// @access: Admin
const getAllUsersProfile = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('No users found');
  }
});

// @description: Authenticate a user and get a token
// @route: POST /api/users/login
// @access: Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user name or password');
  }
});

// @description: Register new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isConfirmed: user.isConfirmed,
      token: generateToken(user._id),
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
    }api/verify/token=${generateToken(user._id)}`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Info Check-A-Sport" <info@trilogywebsolutions.co.uk>', // sender address
      to: `${user.email}`, // list of receivers
      bcc: 'me@garyallin.uk',
      subject: 'Check-A-Sport Registration', // Subject line
      text: 'Check-A-Sport Registration', // plain text body
      html: `
      <h1>Hi ${user.name}</h1>
      <p>You have successfully registered with Check-A-Sport</p>
      <p>Please Click on the link to verify your email.</p>
      <br>
      <h4>Please note, in order to get full functionality you must confirm your mail address with the link below.</h4>
      <p><a href=${link} id='link'>Click here to verify</a></p>
      <p>Thank you Check-A-Sport management</p>
          
       
      `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @description: User Profile
// @route: GET /api/users/profile
// @access: PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isConfirmed: user.isConfirmed,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('No user found');
  }
});

// @description: UPdate User Profile
// @route: PUT /api/users/profile
// @access: PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profileImage = req.body.profileImage || user.profileImage;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('No user found');
  }
});

// @description: Fetch single Profile
// @route: GET /api/user/profile/:id
// @access: Public
const getUserProfileById = asyncHandler(async (req, res) => {
  const userProfile = await User.findById(req.params.id);
  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// @description: Delete a single user
// @route: DELETE /api/users/:id
// @access: PRIVATE/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User successfully removed' });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @description: Update isAdmin to true/false
// @route: PUT /user/profile/:id
// @access: Private/Admin
const updateIsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = req.body.val;
    const updateIsAdmin = await user.save();
    res.json(updateIsAdmin);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
  getUserProfileById,
  deleteUser,
  updateIsAdmin,
};
