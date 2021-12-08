import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers, RoleCodes } from '@graphql/types/generated-graphql-types';
import { dateNow } from '@utils/date';
import { makeGraphqlError } from '@utils/error';
import { randomNumber } from '@utils/helpers';
import mailer, { MAILER_CONFIG_ACCOUNT } from '@utils/mailer';
import { validatorRegister } from '@utils/validators';
import bcrypt from 'bcrypt';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, password, firstName, lastName } = input;
  const { isValid, error } = validatorRegister(input);
  const otp = randomNumber(4);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const user = await UserModel.findOne({ email });

  if (user) {
    throw makeGraphqlError('User already exist!', ErrorCodes.BadUserInput);
  }
  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = new UserModel({
    email,
    firstName,
    lastName,
    password: hashPassword,
    confirmOTP: otp,
    otpExpireAt: dateNow() + 1800,
    role: RoleCodes.USER,
  });
  await mailer.send(MAILER_CONFIG_ACCOUNT.confirmEmails.from, email, 'Please confirm your account', mailer.mailTemplate(otp));
  await newUser.save();
  return true;
};
