import BookModel from '@/models/book';
import ViewModel from '@/models/view';
import { Books, Period, QueryResolvers } from '@graphql/types/generated-graphql-types';
import dayjs from 'dayjs';

export const getBookByRank: QueryResolvers['getBookByRank'] = async (_, { pageIndex, pageSize, search, filter }, context) => {
  // const auth = await checkAuth(context);

  const limit = pageSize;
  const page = (pageIndex - 1) * pageSize;

  // const isVerified = await checkVerified(auth.userId);

  // if (!isVerified) {
  //   throw makeGraphqlError('User is not verified', ErrorCodes.Forbidden);
  // }

  const conditions: any = {};
  const viewConditions: any = {};

  conditions.deletedAt = null;
  if (filter) {
    if (filter.bookType) conditions.bookType = filter.bookType;
    if (filter.period === Period.Day) viewConditions.viewAt = { $gte: dayjs().startOf('day'), $lt: dayjs().endOf('day') };
    if (filter.period === Period.Week) viewConditions.viewAt = { $gte: dayjs().startOf('week'), $lt: dayjs().endOf('week') };
    if (filter.period === Period.Month) viewConditions.viewAt = { $gte: dayjs().startOf('month'), $lt: dayjs().endOf('month') };
  }

  const response = await BookModel.find({ $or: [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }, { author: new RegExp(search, 'i') }], ...conditions })
    .lean()
    .populate([
      { path: 'categories', match: { deletedAt: null } },
      { path: 'coverPhoto', match: { deleteAt: null } },
      { path: 'content', match: { deleteAt: null }, model: 'Media' },
      'uploadedBy',
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
    .limit(100)
    .skip(page)
    .exec();

  const totalItem = await BookModel.count({ $or: [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }, { author: new RegExp(search, 'i') }], ...conditions })
    .lean()
    .populate([
      { path: 'categories', match: { deletedAt: null } },
      { path: 'coverPhoto', match: { deleteAt: null } },
      { path: 'content', match: { deleteAt: null }, model: 'Media' },
      'uploadedBy',
      {
        path: 'relatedBooks',
        populate: [
          { path: 'categories', match: { deletedAt: null }, model: 'Category' },
          { path: 'coverPhoto', match: { deleteAt: null }, model: 'Media' },
          { path: 'content', match: { deleteAt: null }, model: 'Media' },
          { path: 'uploadedBy', model: 'User' },
        ],
      },
    ]);

  const result = response.map(async (item) => {
    const views = await ViewModel.count({ bookId: item._id, ...viewConditions });
    console.log(views);

    return {
      ...item,
      views,
    };
  });

  const books: Books = {
    items: await result.sort(async (a, b) => {
      const a1 = await a;
      const b1 = await b;

      return b1.views - a1.views > 1;
    }),
    paginate: {
      pageSize,
      pageIndex,
      totalItems: totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
    },
  };

  return books;
};
