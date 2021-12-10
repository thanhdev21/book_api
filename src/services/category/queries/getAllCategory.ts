import BookModel from '@/models/book';
import { checkAuth, checkPermissionAdminAndContentCreator, checkVerified } from '@/middleware/auth';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import CategoryModel from '@/models/category';

export const getAllCategories: QueryResolvers['getAllCategories'] = async (_, __, context) => {
  const auth = await checkAuth(context);

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator has permission', ErrorCodes.Forbidden);
  }

  const response = await CategoryModel.find().sort({ createdAt: 'desc' }).exec();

  return response;
};
