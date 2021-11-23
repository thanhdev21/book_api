import BookModel from '@/models/book';
import { QueryResolvers } from '@graphql/types/generated-graphql-types';

export const getAllBooks: QueryResolvers['getAllBooks'] = async (_) => {
  const response = await BookModel.find().populate('user').exec();
  return response;
};
