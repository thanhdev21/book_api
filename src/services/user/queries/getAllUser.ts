import { checkAuth, checkIsAdmin } from '@/middleware/auth';
import UserModel from '@/models/user';
import { ErrorCodes, QueryResolvers, Users } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getAllUsers: QueryResolvers['getAllUsers'] = async (_, { pageIndex, pageSize }, context) => {
  const auth = await checkAuth(context);

  const limit = pageSize;
  const page = (pageIndex - 1) * pageSize;

  const isAdmin = await checkIsAdmin(auth.userId);

  if (!isAdmin) {
    throw makeGraphqlError('Only admin can read database!', ErrorCodes.Forbidden);
  }

  const response = await UserModel.find({ role: 2 }).limit(limit).skip(page).sort({ createdAt: 'desc' }).exec();
  const totalItem = await UserModel.find({ role: 2 }).count();

  const users: Users = {
    items: response,
    paginate: {
      pageSize,
      pageIndex,
      totalItems: totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
    },
  };

  return users;
};
