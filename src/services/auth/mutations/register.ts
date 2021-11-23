import UserModel from '@/models/user';
import { MutationResolvers, ClientJwt, RoleCodes, ErrorCodes } from '@graphql/types/generated-graphql-types';
import { getClient } from '@business/auth';
import { makeGraphqlError } from '@utils/error';
import { signClientAuthToken } from '@utils/jwt';
import { validatorRegister } from '@utils/validators';
import bcrypt from 'bcrypt';
import { randomNumber } from '@utils/helpers';
import mailer, { MAILER_CONFIG_ACCOUNT } from '@utils/mailer';

export const register: MutationResolvers['register'] = async (_, { registerInput }) => {
  const { email, password, firstName, lastName } = registerInput;
  const { isValid, error } = validatorRegister(registerInput);
  let otp = randomNumber(4);
  let isSuccess = false;
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
  });

  try {
    mailer
      .send(MAILER_CONFIG_ACCOUNT.confirmEmails.from, email, 'Please confirm your account', mailer.mailTemplate(otp))
      .then(() => {
        try {
          newUser.save();
          return true;
        } catch (error) {
          console.log('err', error);
          return false;
        }
      })
      .catch((err) => {
        console.log('err', err);
        return false;
      });
    return true;
  } catch (error) {
    return false;
  }
};
