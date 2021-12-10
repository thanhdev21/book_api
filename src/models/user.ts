import { User, UserStatus } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

interface IUser extends mongoose.Document, User {
  _id: string;
}

const UserSchema = new mongoose.Schema(
  {
    // _id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: false },
    confirmOTP: { type: String, required: false, nullable: true },
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

const UserModel = mongoose.models['users'] || mongoose.model<IUser>('users', UserSchema, 'users');
export default UserModel;
