import { checkAuth, checkVerified } from '@/middleware/auth';
import BookModel from '@/models/book';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getBook: QueryResolvers['getBook'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const book = await BookModel.findById(id)
    .populate([{ path: 'categories', match: { deletedAt: null } }, { path: 'coverPhoto', match: { deleteAt: null } }, 'uploadedBy'])
    .exec();

  if (!book) {
    throw makeGraphqlError('Book not found', ErrorCodes.BadUserInput);
  }

  return book;
};
