import mongoose from 'mongoose';

const userProfileImageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);

const UserProfileImages = mongoose.model(
  'UserProfileImages',
  userProfileImageSchema,
);

export default UserProfileImages;
