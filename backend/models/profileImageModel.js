import mongoose from 'mongoose';

const profileImageSchema = mongoose.Schema(
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

const ProfileImages = mongoose.model('ProfileImages', profileImageSchema);

export default ProfileImages;
