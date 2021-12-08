import { User, UserStatus } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

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
    status: { type: String, required: true, default: UserStatus.Active },
    otpExpireAt: { type: Number, required: true },
    role: { type: Number, required: true },
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
