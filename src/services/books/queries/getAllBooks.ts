import BookModel from '@/models/book';
import { checkAuth, checkVerified } from '@/middleware/auth';
import { Books, ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getAllBooks: QueryResolvers['getAllBooks'] = async (_, { pageIndex, pageSize }, context) => {
  const auth = await checkAuth(context);

  const limit = pageSize;
  const page = (pageIndex - 1) * pageSize;

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const response = await BookModel.find().limit(limit).skip(page).populate(['uploadedBy', 'coverPhoto']).sort({ createdAt: 'desc' }).exec();
  const totalItem = await BookModel.count();

  const books: Books = {
    items: response,
    paginate: {
      pageSize,
      pageIndex,
      totalItems: totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
    },
  };

  return books;
};
