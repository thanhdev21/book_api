import BookModel from '@/models/book';
import { QueryResolvers } from '@graphql/types/generated-graphql-types';

export const getBook: QueryResolvers['getBook'] = async (_, { id }) => {
  const response = await BookModel.findById(id).populate('user').exec();
  return response;
};
