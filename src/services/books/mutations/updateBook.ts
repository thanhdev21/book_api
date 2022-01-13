import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import BookModel from '@/models/book';

import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatBook } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const updateBook: MutationResolvers['updateBook'] = async (_, { id, input }, context) => {
  const { title, coverPhoto, categories, description, isbn, author, relasedDate, price, content } = input;
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

  if (book.title === title) {
    throw book('Book already exist!', ErrorCodes.BadUserInput);
  }

  const newRelatedBook = await BookModel.find({ categories: { $in: categories }, _id: { $ne: book._id } }).distinct('_id');

  book.title = title;
  book.description = description;
  book.coverPhoto = coverPhoto;
  book.author = author;
  book.isbn = isbn;
  book.categories = categories;
  book.relatedBooks = newRelatedBook;
  book.relasedDate = relasedDate || new Date();
  book.price = price;
  book.content = content;
  await book.save().then((res) =>
    BookModel.findById(res._id)
      .populate([
        { path: 'categories', match: { deletedAt: null } },
        'coverPhoto',
        'uploadedBy',
        'content',
        {
          path: 'relatedBooks',
          populate: [
            { path: 'categories', match: { deletedAt: null }, model: 'Category' },
            { path: 'coverPhoto', match: { deleteAt: null }, model: 'Media' },
            { path: 'content', match: { deleteAt: null }, model: 'Media' },
            { path: 'uploadedBy', model: 'User' },
          ],
        },
      ])
      .exec(),
  );

  return book;
};
