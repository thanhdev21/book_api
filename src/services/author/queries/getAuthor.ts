import { checkAuth, checkVerified } from '@/middleware/auth';
import AuthorModel from '@/models/author';
import { ErrorCodes, QueryResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';

export const getAuthor: QueryResolvers['getAuthor'] = async (_, { id }, context) => {
  const auth = await checkAuth(context);

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const author = await AuthorModel.findById(id)
    .populate([{ path: 'avatar', match: { deleteAt: null }, model: 'Media' }])
    .exec();

  if (!author) {
    throw makeGraphqlError('Author not found', ErrorCodes.BadUserInput);
  }

  return author;
};
