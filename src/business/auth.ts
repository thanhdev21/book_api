import { hashPassword } from '@utils/password';
import UserModel from '@/models/user';
import { randomNumber } from '@utils/helpers';

export const createUser = async (input: { firstName: string; lastName: string; phoneNumber?: string; email: string; password: string; isEmailVerified: boolean }) => {
  let otp = randomNumber(4);
  const userRepo = new UserModel({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    password: hashPassword(input.password),
    confirmOTP: otp,
  });

  return userRepo.save();
};
