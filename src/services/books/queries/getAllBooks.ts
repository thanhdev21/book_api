import BookModel from '@/models/book';
import { checkAuth } from '@/middleware/auth';
import { Books, QueryResolvers } from '@graphql/types/generated-graphql-types';

export const getAllBooks: QueryResolvers['getAllBooks'] = async (_, { pageIndex, pageSize }, context) => {
  checkAuth(context);
  const limit = pageSize;
  const page = (pageIndex - 1) * pageSize;
  const response = await BookModel.find().limit(limit).skip(page).populate('user').exec();
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
