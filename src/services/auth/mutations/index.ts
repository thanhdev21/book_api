import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { login } from './login';
import { register } from './register';
import { resendOtp } from './resendOTP';
import { verifyEmail } from './verifyEmail';

export const authMutations: MutationResolvers = {
  register,
  login,
  verifyEmail,
  resendOtp,
};
