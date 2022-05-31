import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import ProfileImages from '../models/profileImageModel.js';
import UserReviewer from '../models/userReviewerModel.js';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';

// @description: Get All the Profiles
// @route: GET /api/profiles
// @access: Public
const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  if (profiles) {
    res.json(profiles);
  } else {
    res.status(404);
    throw new Error('No profiles found');
  }
});

// @description: Get All the users Profiles
// @route: GET /api/profiles
// @access: Admin
const getAllProfilesAdmin = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  if (profiles) {
    res.json(profiles);
  } else {
    res.status(404);
    throw new Error('No users found');
  }
});

// @description: Fetch single Profile
// @route: GET /api/profile/:id
// @access: Public
const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// @description: Add profile after registration
// @route: POST /api/profiles
// @access: Private and Admin
const createProfile = asyncHandler(async (req, res) => {
  const profile = new Profile({
    user: req.user._id,
    name: '',
    email: ``,
    faceBook: ``,
    instagram: ``,
    profileImage: 'uploads/profiles/sample.png',
    specialisation: '',
    location: '',
    qualifications: '',
    isQualificationsVerified: false,
    telephoneNumber: '',
    keyWordSearch: '',
    keyWordSearchOne: '',
    keyWordSearchTwo: '',
    keyWordSearchThree: '',
    keyWordSearchFour: '',
    keyWordSearchFive: '',
    specialisationOne: '',
    specialisationTwo: '',
    specialisationThree: '',
    specialisationFour: '',
    rating: 0,
    showName: false,
    description: '',
    numReviews: 0,
  });

  const createProfile = await profile.save();
  res.status(210).json(createProfile);
});

// @description: User Profile
// @route: GET /api/profile
// @access: PRIVATE
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.find({ user: req.user._id.toString() });

  if (profile) {
    res.json(...profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// @description: Update Profile CLICKS
// @route: PUT /api/profile-clicks
// @access: PUBLIC
const updateProfileClicks = asyncHandler(async (req, res) => {
  const { _id, profileClickCounter } = req.body;

  // Find profile
  const profile = await Profile.find({
    _id,
  });

  if (profile) {
    profile[0].profileClickCounter =
      profile[0].profileClickCounter + profileClickCounter;
    const updatedProfile = await profile[0].save();
    res.json(updatedProfile);
  } else {
    res.status(404);
    throw new Error('User Not found');
  }
});

// @description: Update Profile
// @route: PUT /api/profile
// @access: PRIVATE
const updateProfile = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    email,
    faceBook,
    instagram,
    websiteUrl,
    profileImage,
    description,
    qualifications,
    specialisation,
    location,
    telephoneNumber,
    keyWordSearch,
    keyWordSearchOne,
    keyWordSearchTwo,
    keyWordSearchThree,
    keyWordSearchFour,
    keyWordSearchFive,
    specialisationOne,
    specialisationTwo,
    specialisationThree,
    specialisationFour,
  } = req.body;

  // Find all profiles
  const profile = await Profile.find({});

  // Filter profile id
  const searchId = profile.filter((id) => {
    if (req.params.id == id.user) {
      return id._id.toString();
    }
  });

  if (searchId[0]) {
    searchId[0].user = req.params.id;
    searchId[0].name = name;
    searchId[0].email = email;
    searchId[0].faceBook = faceBook;
    searchId[0].instagram = instagram;
    searchId[0].websiteUrl = websiteUrl;
    searchId[0].profileImage = profileImage;
    searchId[0].description = description;
    searchId[0].qualifications = qualifications;
    searchId[0].specialisation = specialisation;
    searchId[0].location = location;
    searchId[0].telephoneNumber = telephoneNumber;
    searchId[0].keyWordSearch = keyWordSearch;
    searchId[0].keyWordSearchOne = keyWordSearchOne;
    searchId[0].keyWordSearchTwo = keyWordSearchTwo;
    searchId[0].keyWordSearchThree = keyWordSearchThree;
    searchId[0].keyWordSearchFour = keyWordSearchFour;
    searchId[0].keyWordSearchFive = keyWordSearchFive;
    searchId[0].specialisationOne = specialisationOne;
    searchId[0].specialisationTwo = specialisationTwo;
    searchId[0].specialisationThree = specialisationThree;
    searchId[0].specialisationFour = specialisationFour;

    const updateProfile = await searchId[0].save();
    res.json(updateProfile);
  } else {
    res.status(404);
    throw new Error('No user found');
  }
});

// @description: Delete a single user
// @route: DELETE /api/profiles/admin/:id
// @access: PRIVATE/Admin
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (profile) {
    await profile.remove();
    res.json({ message: 'Profile successfully removed' });
  } else {
    res.status(404);
    throw new Error('Profile Not Found');
  }
});

// @description: Delete a single review
// @route: DELETE /api/profile/review/admin/:id
// @access: PRIVATE/Admin
const deleteReview = asyncHandler(async (req, res) => {
  const profileReview = await Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { reviews: { _id: req.body.reviewId } } },
  );

  const review = profileReview.reviews.filter((review) => {
    if (req.body.reviewId === review._id.toString()) {
      return review;
    }
  });

  // We need you update the number of reviews and rating
  const profile = await Profile.findById(req.params.id);
  profile.numReviews = profile.reviews.length;
  profile.rating =
    profile.reviews.reduce((acc, item) => item.rating + acc, 0) /
    profile.reviews.length;
  await profile.save();
  // We need you update the number of reviews and rating

  if (review.length > 0) {
    res.json({ message: 'Review successfully removed' });
  } else {
    res.status(404);
    throw new Error('Review Not Found');
  }
});

// @description: CREATE a new review
// @route: POST /api/profiles/:id/reviews
// @access: Private
const createProfileReview = asyncHandler(async (req, res) => {
  const { rating, comment, showName, userProfileId, acceptConditions } =
    req.body;

  const reviewerProfile = await UserReviewer.findById(req.params.id);
  const profile = await Profile.find({ user: userProfileId });

  //Find the user that was reviewed
  const user = await User.findById(userProfileId);

  // check if review exists
  const arrayOfId = profile[0].reviews.map((review) => review.user.toString());
  const allReadyReviewed = arrayOfId.includes(req.params.id);

  if (reviewerProfile && !allReadyReviewed) {
    const review = {
      user: req.params.id,
      name: reviewerProfile.name,
      showName,
      rating: Number(rating),
      comment,
      userProfileId: reviewerProfile.userProfileId,
      hasAccepted: acceptConditions,
    };

    profile[0].reviews.push(review);
    profile[0].numReviews = profile[0].reviews.length;
    profile[0].rating =
      profile[0].reviews.reduce((acc, item) => item.rating + acc, 0) /
      profile[0].reviews.length;

    await profile[0].save();

    // Send email to user telling thm that a review has been created
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

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Body Vantage" <info@bodyvantage.co.uk>', // sender address
      to: `${user.email}`, // list of receivers
      bcc: 'info@bodyvantage.co.uk',
      subject: 'Body Vantage REVIEW', // Subject line
      text: 'Body Vantage REVIEW', // plain text body
      html: `
      <h1>Hi ${user.name}</h1>
      <p>${review.name}, has submitted the following review about your service:</p>
      <p>"${review.comment}"</p>
      <p>This review has been published and will show on your profile page.</p>
      <h3>If you feel that this review is un-related or fake please contact BodyVantage management ASAP!</h3>

      <p>Thank you. Body Vantage management</p>
          
       
      `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // Send email to user telling thm that a review has been created

    res.status(201).json({ message: 'Review added successfully' });
  } else {
    res.status(404);
    throw new Error(
      'Profile not found or this profile has already been reviewed by you.',
    );
  }
});

// @description: Update Qualification to true/false
// @route: PUT /api/profiles/:id/verified
// @access: Private/Admin
const updateProfileQualificationToTrue = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    profile.isQualificationsVerified = true;
    const updateProfile = await profile.save();
    res.json(updateProfile);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @description: Get profile images
// @route: GET /api/profile-images
// @access: Private
const getAllProfileImages = asyncHandler(async (req, res) => {
  const profileImages = await ProfileImages.find({
    user: req.user._id.toString(),
  }).sort({ _id: -1 });

  if (profileImages) {
    res.json(profileImages);
  } else {
    res.status(404);
    throw new Error('No profile images found');
  }
});

// @description: Get profile images Public
// @route: GET /api/profile-images-public/:id
// @access: Public
const getAllProfileImagesPublic = asyncHandler(async (req, res) => {
  const profileImages = await ProfileImages.find({
    user: req.params.id,
  }).sort({ _id: -1 });

  if (profileImages) {
    res.json(profileImages);
  } else {
    res.status(404);
    throw new Error('No profile images found');
  }
});

export {
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
  getAllProfileImagesPublic,
};
