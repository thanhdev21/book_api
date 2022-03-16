import { checkAuth, checkPermissionAdminAndContentCreator } from '@/middleware/auth';
import AuthorModel from '@/models/author';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { validatorCreateAuthor } from '@utils/validators';
import { JwtPayload } from 'jsonwebtoken';

export const updateAuthor: MutationResolvers['updateAuthor'] = async (_, { id, input }, context) => {
  const { name, description, avatar, gender, dateOfBirth } = input;
  const { isValid, error } = validatorCreateAuthor(input);
  const auth: JwtPayload = await checkAuth(context);

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const hasPermission = await checkPermissionAdminAndContentCreator(auth.userId);

  if (!hasPermission) {
    throw makeGraphqlError('Only admin and content creator can update Author', ErrorCodes.Forbidden);
  }

  const author = await AuthorModel.findById(id);

  if (!author) {
    throw makeGraphqlError('Author does not exist!', ErrorCodes.BadUserInput);
  }

  if (author.name === name && author.id !== id) {
    throw makeGraphqlError('Author already exist!', ErrorCodes.BadUserInput);
  }

  author.name = name;
  author.description = description;
  author.dateOfBirth = dateOfBirth;
  author.avatar = avatar;
  author.gender = gender;
  await author.save((res) =>
    AuthorModel.findById(res._id)
      .populate([{ path: 'avatar', match: { deleteAt: null }, model: 'Media' }])
      .exec(),
  );

  return author;
};
