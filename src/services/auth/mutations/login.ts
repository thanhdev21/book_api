import UserModel from '@/models/user';
import { ErrorCodes, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { buildJWTResponse } from '@utils/jwt';
import { validatorLogin } from '@utils/validators';
import bcrypt from 'bcrypt';

export const login: MutationResolvers['login'] = async (_, { data }) => {
  const { email, password } = data;
  const { isValid, error } = validatorLogin(data);
 
  const user = await UserModel.findOne({email});
  
  if (!user) {
    throw makeGraphqlError('User does not already exist!', ErrorCodes.GraphqlValidationFailed);
  }

  if (!isValid) {
    throw makeGraphqlError(error.message, ErrorCodes.BadUserInput);
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){ throw makeGraphqlError('Wrong password!', ErrorCodes.BadUserInput)}

  const response = await buildJWTResponse(user, 12)

 return response

};
