import { checkAuth, checkIsAdmin } from '@/middleware/auth';
import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { JwtPayload } from 'jsonwebtoken';

export const updateUserStatus: MutationResolvers['updateUserStatus'] = async (_, { input }, context) => {
  const auth: JwtPayload = await checkAuth(context);

  const isAdmin = checkIsAdmin(auth.userId);

  if (!isAdmin) {
    throw makeGraphqlError('Only admin can update user status', ErrorCodes.Forbidden);
  }

  const user = await UserModel.findByIdAndUpdate(input.id, { $set: { status: input.status } });

  return user;
};
