import { CommentModel } from '@/models/comment';
import { RoleCodes } from '@constants/enum';
import { MutationResolvers, ErrorCodes } from '@graphql/types/generated-graphql-types';
import { requiredAuth } from '@middleware/auth';
import { makeGraphqlError } from '@utils/error';

export const hideComment = requiredAuth<MutationResolvers['hideComment']>(async (_, { _id }, { auth }) => {
  const comment = await CommentModel.findById(_id);

  if (auth.role !== RoleCodes.ADMIN) {
    throw makeGraphqlError('Only Admin can hide comment', ErrorCodes.Forbidden);
  }

  comment.hidden = true;
  comment.updatedAt = new Date();

  await comment.save().then((res) => CommentModel.findById(res._id).populate(['createdBy']).exec());

  return comment;
});

export const unhideComment = requiredAuth<MutationResolvers['unhideComment']>(async (_, { _id }, { auth }) => {
  const comment = await CommentModel.findById(_id);

  if (auth.role !== RoleCodes.ADMIN) {
    throw makeGraphqlError('Only Admin can unhide comment', ErrorCodes.Forbidden);
  }

  comment.hidden = false;
  comment.updatedAt = new Date();

  await comment.save().then((res) => CommentModel.findById(res._id).populate(['createdBy']).exec());

  return comment;
});
