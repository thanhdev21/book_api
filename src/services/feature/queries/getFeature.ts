import { checkAuth, checkVerified } from '@/middleware/auth';
import BookModel from '@/models/book';
import FeatureModel from '@/models/feature';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getFeature: QueryResolvers['getFeature'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const feature = await FeatureModel.findById(id)
    .populate([
      { path: 'books', match: { deletedAt: null } },
      { path: 'coverPhoto', match: { deleteAt: null } },
    ])
    .exec();

  if (!feature) {
    throw makeGraphqlError('Feature not found', ErrorCodes.BadUserInput);
  }

  return feature;
};
