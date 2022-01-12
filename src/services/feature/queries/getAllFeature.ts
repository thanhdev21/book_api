import BookModel from '@/models/book';
import { checkAuth, checkVerified } from '@/middleware/auth';
import { Feature, ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import FeatureModel from '@/models/feature';

export const getAllFeatures: QueryResolvers['getAllFeatures'] = async (_, __, context) => {
  const response = await FeatureModel.find({ deletedAt: null })
    .populate([
      { path: 'books', match: { deletedAt: null } },
      { path: 'coverPhoto', match: { deleteAt: null } },
    ])
    .sort({ createdAt: 'desc' })
    .exec();

  return response;
};
