import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import UserReviewer from '../models/userReviewerModel.js';

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
    name: 'Sample name',
    email: 'sample1@mail.com',
    profileImage: 'sample.png',
    specialisation: 'sample Specialisation',
    location: 'Sample Location',
    qualifications: 'Sample QUALIFICATIONS',
    isQualificationsVerified: false,
    telephoneNumber: '12345678901',
    keyWordSearch: 'Sample, fitness,massage,London, sports massage, etc',
    keyWordSearchOne: 'one',
    keyWordSearchTwo: 'two',
    keyWordSearchThree: 'three',
    keyWordSearchFour: 'four',
    keyWordSearchFive: 'five',
    specialisationOne: 'Specialisation One',
    specialisationTwo: 'Specialisation Two',
    specialisationThree: 'Specialisation Three',
    specialisationFour: 'Specialisation Four',
    rating: 0,
    showName: false,
    description: 'Sample Description',
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

// @description: Update Profile
// @route: PUT /api/profile
// @access: PRIVATE
const updateProfile = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    email,
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
  const { rating, comment, showName, userProfileId } = req.body;

  const reviewerProfile = await UserReviewer.findById(req.params.id);
  const profile = await Profile.find({ user: userProfileId });

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
    };

    profile[0].reviews.push(review);
    profile[0].numReviews = profile[0].reviews.length;
    profile[0].rating =
      profile[0].reviews.reduce((acc, item) => item.rating + acc, 0) /
      profile[0].reviews.length;

    await profile[0].save();
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
};
