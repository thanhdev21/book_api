import { checkAuth, checkIsAdmin, checkVerified } from '@/middleware/auth';
import BookModel from '@/models/book';
import UserModel from '@/models/user';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getUser: QueryResolvers['getUser'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isAdmin = await checkIsAdmin(auth.userId);

  if (!isAdmin) {
    throw makeGraphqlError('Only admin can read database!', ErrorCodes.Forbidden);
  }

  const user = await UserModel.findById(id).exec();

  if (!user) {
    throw makeGraphqlError('Book not found', ErrorCodes.BadUserInput);
  }

  return user;
};
