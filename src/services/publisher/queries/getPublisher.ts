import { checkAuth, checkPermissionAdminAndContentCreator, checkVerified } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import PublisherModel from '@/models/publisher';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getPublisher: QueryResolvers['getPublisher'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const publisher = await PublisherModel.findById(id)
    .populate([{ path: 'avatar', match: { deleteAt: null }, model: 'Media' }])
    .exec();

  if (!publisher) {
    throw makeGraphqlError('Publisher not found', ErrorCodes.BadUserInput);
  }

  return publisher;
};
