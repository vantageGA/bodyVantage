import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'UserReviewer',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    showName: {
      type: Boolean,
      required: true,
      default: false,
    },
    userProfileId: {
      type: String,
    },
    hasAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// const clickCountSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     clickCount: {
//       type: Number,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    faceBook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
    description: {
      type: String,
    },
    specialisation: {
      type: String,
    },
    qualifications: {
      type: String,
    },
    isQualificationsVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    location: {
      type: String,
    },
    telephoneNumber: {
      type: String,
    },
    keyWordSearch: {
      type: String,
    },
    keyWordSearchOne: {
      type: String,
    },
    keyWordSearchTwo: {
      type: String,
    },
    keyWordSearchThree: {
      type: String,
    },
    keyWordSearchFour: {
      type: String,
    },
    keyWordSearchFive: {
      type: String,
    },
    specialisationOne: {
      type: String,
    },
    specialisationTwo: {
      type: String,
    },
    specialisationThree: {
      type: String,
    },
    specialisationFour: {
      type: String,
    },
    reviews: [reviewsSchema],
    profileClickCounter: { type: Number, default: 0 },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
