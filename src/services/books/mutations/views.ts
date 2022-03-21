import { checkAuth } from '@/middleware/auth';
import ViewModel from '@/models/view';
import { MutationResolvers } from '@graphql/types/generated-graphql-types';

export const views: MutationResolvers['views'] = async (_, { bookId }, context) => {
  await checkAuth(context);

  const newView = new ViewModel({
    bookId,
    viewAt: new Date(),
  });

  await newView.save();

  return true;
};
