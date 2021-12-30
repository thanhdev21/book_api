import { checkAuth, checkPermissionAdminAndContentCreator, checkVerified } from '@/middleware/auth';
import CategoryModel from '@/models/category';
import { MediaModel } from '@/models/media';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getMedia: QueryResolvers['getMedia'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const media = await MediaModel.findById(id).exec();

  if (!media) {
    throw makeGraphqlError('Media not found', ErrorCodes.BadUserInput);
  }

  return media;
};
