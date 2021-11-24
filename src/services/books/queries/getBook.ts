import { checkAuth } from '@/middleware/auth';
import BookModel from '@/models/book';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getBook: QueryResolvers['getBook'] = async (_, { id }, context) => {
  checkAuth(context);

  const book = await BookModel.findById(id).populate('user').exec();

  if (!book) {
    throw makeGraphqlError('Book not found', ErrorCodes.BadUserInput);
  }

  return book;
};
