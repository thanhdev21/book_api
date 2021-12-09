import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorUpdateCategory } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const updateCategory: MutationResolvers['updateCategory'] = async (_, { input }, context) => {
  const { name, description, id } = input;
  const { isValid, error } = validatorUpdateCategory(input);
  const auth: JwtPayload = await checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can update category', ErrorCodes.Forbidden);
  }

  const category = await CategoryModel.findById(id);

  if (!category) {
    throw makeGraphqlError('Category does not exist!', ErrorCodes.BadUserInput);
  }

  category.update({ name, description });

  return category;
};
