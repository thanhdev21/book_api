import { checkAuth, checkIsAdmin, checkVerified } from '@/middleware/auth';
import BookModel from '@/models/book';
import { MediaModel } from '@/models/media';
import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { validateObjectIds } from '@utils/database';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatBook } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const updateUserStatus: MutationResolvers['updateUserStatus'] = async (_, { input }, context) => {
  const auth: JwtPayload = await checkAuth(context);

  const isAdmin = checkIsAdmin(auth.userId);

  if (!isAdmin) {
    throw makeGraphqlError('Only admin can update user status', ErrorCodes.Forbidden);
  }

  const user = await UserModel.findByIdAndUpdate(input.id, { status: input.status });

  return user;
};
