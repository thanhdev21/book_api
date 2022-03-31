import { checkAuth } from '@/middleware/auth';
import FavouriteBookModel from '@/models/favouriteBook';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorFavourite } from '@utils/validators';

export const deleteFavouriteBook: MutationResolvers['deleteFavouriteBook'] = async (_, { input }, context) => {
  const { bookId } = input;
  const { isValid, error } = validatorFavourite(input);
  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }
  await checkAuth(context);
  const result = await FavouriteBookModel.findOneAndRemove({ book: bookId }).exec();

  if (!result) {
    throw makeGraphqlError('Books do not exist in favourites', ErrorCodes.BadUserInput);
  }
  return true;
};
