import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import CategoryModel from '@/models/Category';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getCategory: QueryResolvers['getCategory'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator has permission', ErrorCodes.Forbidden);
  }

  const category = await CategoryModel.findById(id).populate('uploadedBy').exec();

  if (!category) {
    throw makeGraphqlError('Category not found', ErrorCodes.BadUserInput);
  }

  return category;
};
