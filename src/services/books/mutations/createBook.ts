import { checkAuth, checkVerified } from '@/middleware/auth';
import BookModel from '@/models/book';
import { MediaModel } from '@/models/media';
import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { validateObjectIds } from '@utils/database';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatBook } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const createBook: MutationResolvers['createBook'] = async (_, { input }, context) => {
  const { title, description, isbn, categories, author } = input;
  const { isValid, error } = validatorCreatBook(input);
  const auth: JwtPayload = await checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const book = await BookModel.findOne({ title });

  const creator = await UserModel.findById(auth.userId);

  if (input.coverPhoto) await validateObjectIds(MediaModel, [input.coverPhoto]);

  const media = await MediaModel.findById(input.coverPhoto);

  if (book) {
    throw makeGraphqlError('Book is already exist!', ErrorCodes.BadUserInput);
  }

  const newBook = new BookModel({
    title,
    description,
    isbn,
    author,
    uploadedBy: creator,
    coverPhoto: media,
    categories,
  });
  await newBook.save();

  return newBook;
};
