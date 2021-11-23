import { hashPassword } from '@utils/password';
import UserModel from '@/models/user';
import { randomNumber } from '@utils/helpers';
import { UserTokenType } from '@constants/enum';
import UserTokenModel from '@/models/userToken';
import { dateNow } from '@utils/date';
import { v4 } from 'uuid';
import ClientModel from '@/models/client';

export const genUserToken = async (parentId: number, userTokenType: UserTokenType, expiresInSeconds: number = 600) => {
  const userTokenRepo = new UserTokenModel({
    expiresAt: dateNow() + expiresInSeconds,
    tokenId: `${v4()}-${v4()}`,
    type: userTokenType,
    user: parentId,
    createdAt: dateNow(),
  });
  return userTokenRepo.save();
};

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

export const getClient = async (condition: { clientId: string; secretKey: string }) => {
  const { clientId, secretKey } = condition;

  return ClientModel.findOne({ clientId: clientId, secretKey: secretKey });
};
