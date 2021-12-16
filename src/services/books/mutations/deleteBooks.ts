import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import BookModel from '@/models/book';
import CategoryModel from '@/models/category';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { dateNow } from '@utils/date';
import { makeGraphqlError } from '@utils/error';
import { validatorUpdateCategory } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const deleteBook: MutationResolvers['deleteBook'] = async (_, { id }, context) => {
  const auth: JwtPayload = await checkAuth(context);

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can delete book', ErrorCodes.Forbidden);
  }

  const book = await BookModel.findById(id);

  if (!book) {
    throw makeGraphqlError('Book does not exist!', ErrorCodes.BadUserInput);
  }

  book.deletedAt = null;

  await book.save();

  return true;
};
