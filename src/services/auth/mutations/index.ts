import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { login } from './login';
import { logout } from './logout';
import { refreshToken } from './refreshToken';
import { register } from './register';
import { resendOtp } from './resendOTP';
import { verifyEmail } from './verifyEmail';

export const authMutations: MutationResolvers = {
  register,
  login,
  verifyEmail,
  resendOtp,
  refreshToken,
  logout,
};
