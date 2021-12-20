import BookModel from '@/models/book';
import { checkAuth, checkVerified } from '@/middleware/auth';
import { Books, ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getAllBooks: QueryResolvers['getAllBooks'] = async (_, { pageIndex, pageSize, search, filter }, context) => {
  const auth = await checkAuth(context);

  const limit = pageSize;
  const page = (pageIndex - 1) * pageSize;

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const conditions: any = {};
  conditions.deletedAt = null;
  if (filter) {
    if (filter.categories) conditions.categories = { $in: filter.categories };
    if (filter.uploadedBy) conditions.uploadedBy = filter.uploadedBy;
  }
  const response = await BookModel.find({ title: new RegExp(search, 'i'), ...conditions })
    .populate([{ path: 'categories', match: { deletedAt: null } }, 'coverPhoto', 'uploadedBy'])
    .limit(limit)
    .skip(page)
    .sort({ createdAt: 'desc' })
    .exec();

  const totalItem = await BookModel.count({ title: new RegExp(search, 'i'), ...conditions }).populate([{ path: 'categories', match: { deletedAt: null } }, 'coverPhoto', 'uploadedBy']);

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
