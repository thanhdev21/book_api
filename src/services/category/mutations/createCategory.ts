import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreateCategory } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const createCategory: MutationResolvers['createCategory'] = async (_, { input }, context) => {
  const { name, description } = input;
  const { isValid, error } = validatorCreateCategory(input);
  const auth: JwtPayload = await checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can create category', ErrorCodes.Forbidden);
  }

  const category = await CategoryModel.findOne({ name });

  if (category) {
    throw makeGraphqlError('Category is already exist!', ErrorCodes.BadUserInput);
  }

  const newCategory = new CategoryModel({
    name,
    description,
  });
  await newCategory.save();

  return newCategory;
};
