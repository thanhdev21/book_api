import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import PublisherModel from '@/models/publisher';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatePublisher } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const createPublisher: MutationResolvers['createPublisher'] = async (_, { input }, context) => {
  const { name, description, logo, registedDate, address, numberOfWork } = input;
  const { isValid, error } = validatorCreatePublisher(input);
  const auth: JwtPayload = await checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can create publisher', ErrorCodes.Forbidden);
  }

  const publisher = await PublisherModel.findOne({ name, deletedAt: null });

  if (publisher) {
    throw makeGraphqlError('Publisher is already exist!', ErrorCodes.BadUserInput);
  }

  const newCategory = new PublisherModel({
    name,
    description,
    registedDate,
    logo,
    address,
    numberOfWork,
  });
  await newCategory.save();

  return newCategory;
};
