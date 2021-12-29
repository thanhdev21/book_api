import { checkAuth, checkPermissionAdminAndContentCreator, checkVerified } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getCategory: QueryResolvers['getCategory'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const category = await CategoryModel.findById(id).exec();

  if (!category) {
    throw makeGraphqlError('Category not found', ErrorCodes.BadUserInput);
  }

  return category;
};
