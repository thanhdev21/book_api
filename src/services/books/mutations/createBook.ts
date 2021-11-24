import { checkAuth } from '@/middleware/auth';
import BookModel from '@/models/book';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreatBook } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const createBook: MutationResolvers['createBook'] = async (_, { input }, context) => {
  const { title, description, isbn } = input;
  const { isValid, error } = validatorCreatBook(input);
  const user: JwtPayload = checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const book = await BookModel.findOne({ title });

  if (book) {
    throw makeGraphqlError('Book is already exist!', ErrorCodes.BadUserInput);
  }

  const newBook = new BookModel({
    title,
    description,
    isbn,
    user: user.userId,
  });
  newBook.save();
  return newBook;
};
