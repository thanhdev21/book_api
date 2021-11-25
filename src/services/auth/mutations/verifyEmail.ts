import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorVerifyEmail } from '@utils/validators';

export const verifyEmail: MutationResolvers['verifyEmail'] = async (_, { input }) => {
  const { email, otp } = input;
  const { isValid, error } = validatorVerifyEmail(input);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw makeGraphqlError('User does not already exist!', ErrorCodes.BadUserInput);
  }

  if (!user.isConfirmed) {
    if (user.confirmOTP === otp) {
      return UserModel.findOneAndUpdate({ email }, { isConfirmed: true, confirmOTP: null })
        .then(() => {
          return true;
        })
        .catch((e) => {
          throw makeGraphqlError(e, ErrorCodes.InternalServerError);
        });
    } else {
      throw makeGraphqlError('Otp does not match', ErrorCodes.BadUserInput);
    }
  } else {
    throw makeGraphqlError('Account already confirmed', ErrorCodes.Forbidden);
  }
};
