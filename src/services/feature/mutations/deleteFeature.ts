import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import FeatureModel from '@/models/feature';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { JwtPayload } from 'jsonwebtoken';

export const deleteFeature: MutationResolvers['deleteFeature'] = async (_, { id }, context) => {
  const auth: JwtPayload = await checkAuth(context);

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can delete feature', ErrorCodes.Forbidden);
  }

  const feature = await FeatureModel.findById(id);

  if (!feature) {
    throw makeGraphqlError('Feature does not exist!', ErrorCodes.BadUserInput);
  }

  feature.deletedAt = new Date();

  await feature.save();

  return true;
};
