import { checkAuth } from '@/middleware/auth';
import BookModel from '@/models/book';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { JwtPayload } from 'jsonwebtoken';

export const views: MutationResolvers['views'] = async (_, { id }, context) => {
  const auth: JwtPayload = await checkAuth(context);

  const book = await BookModel.findById(id);

  if (!book) {
    throw makeGraphqlError('Book does not exist!', ErrorCodes.BadUserInput);
  }

  book.views = book.views + 1;

  await book.save().then((res) =>
    BookModel.findById(res._id)
      .populate([
        { path: 'categories', match: { deletedAt: null }, model: 'Category' },
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
          // model: 'Book',
        },
      ])
      .exec(),
  );

  return true;
};
