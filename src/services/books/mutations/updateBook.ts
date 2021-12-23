import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import BookModel from '@/models/book';

import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatBook } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const updateBook: MutationResolvers['updateBook'] = async (_, { id, input }, context) => {
  const { title, coverPhoto, categories, description, isbn, author } = input;
  const { isValid, error } = validatorCreatBook(input);
  const auth: JwtPayload = await checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can update book', ErrorCodes.Forbidden);
  }

  const book = await BookModel.findById(id);

  if (!book) {
    throw book('Book does not exist!', ErrorCodes.BadUserInput);
  }

  const newRelatedBook = await BookModel.find({ categories: { $in: categories }, _id: { $not: book._id } }).distinct('_id');

  book.title = title;
  book.description = description;
  book.coverPhoto = coverPhoto;
  book.author = author;
  book.isbn = isbn;
  book.categories = categories;
  await book.save();

  return book;
};
