import mongoose from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  confirmOTP?: string;
  otpTries?: boolean;
  status: boolean;
  otpExpireAt: number;
  // _id: mongoose.Schema.Types.ObjectId;
}

const UserSchema = new mongoose.Schema<User>(
  {
    // _id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: false },
    confirmOTP: { type: String, required: false, nullable: true },
    otpTries: { type: Boolean, required: false, default: false },
    status: { type: Boolean, required: true, default: true },
    otpExpireAt: { type: Number, required: true },
  },
  { timestamps: true },
);

// Virtual for user's full name
UserSchema.virtual('fullName').get(function (this: User) {
  return this.firstName + ' ' + this.lastName;
});
UserSchema.index({ email: 1 });
const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
