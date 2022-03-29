import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userReviewerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userReviewerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Adding the encrypton before saving to DB
userReviewerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserReviewer = mongoose.model('UserReviewer', userReviewerSchema);

export default UserReviewer;
