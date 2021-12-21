import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import UserModel from '@/models/user';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getMe: QueryResolvers['me'] = async (_, __, context) => {
  const auth = await checkAuth(context);

  const me = await UserModel.findById(auth.userId).exec();

  if (!me) {
    throw makeGraphqlError('User not found', ErrorCodes.BadUserInput);
  }

  return me;
};
