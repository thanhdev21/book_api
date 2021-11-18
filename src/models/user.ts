import mongoose from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  confirmOTP?: string | null | number;
  otpTries?: number;
  status: boolean;
}

const UserSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: false },
    confirmOTP: { type: String, required: false },
    otpTries: { type: Number, required: false, default: 0 },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

// Virtual for user's full name
UserSchema.virtual('fullName').get(function (this: User) {
  return this.firstName + ' ' + this.lastName;
});
const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
