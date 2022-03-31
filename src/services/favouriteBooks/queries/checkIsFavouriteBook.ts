import { checkAuth } from '@/middleware/auth';
import FavouriteBookModel from '@/models/favouriteBook';
import { QueryResolvers, ErrorCodes } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorFavourite } from '@utils/validators';

export const checkIsFavouriteBook: QueryResolvers['checkIsFavouriteBook'] = async (_, { input }, context) => {
  const { bookId } = input;
  const { isValid, error } = validatorFavourite(input);
  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }
  await checkAuth(context);
  const favouriteBook = await FavouriteBookModel.find({ book: bookId }).exec();
  if (favouriteBook.length === 0) {
    return false;
  }
  return true;
};
