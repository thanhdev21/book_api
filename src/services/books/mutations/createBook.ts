import { checkAuth, checkVerified } from '@/middleware/auth';
import BookModel from '@/models/book';
import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatBook } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const createBook: MutationResolvers['createBook'] = async (_, { input }, context) => {
  const { title, description, isbn } = input;
  const { isValid, error } = validatorCreatBook(input);
  const auth: JwtPayload = checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const isVerified = await checkVerified(auth.userId);

  if (!isVerified) {
    throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  }

  const book = await BookModel.findOne({ title });

  const creator = await UserModel.findById(auth.userId);

  if (book) {
    throw makeGraphqlError('Book is already exist!', ErrorCodes.BadUserInput);
  }

  const newBook = new BookModel({
    title,
    description,
    isbn,
    user: creator,
  });
  newBook.save();

  return newBook;
};
