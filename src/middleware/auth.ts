import UserModel from '@/models/user';
import { ErrorCodes } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user: JwtPayload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        return user;
      } catch (err) {
        throw makeGraphqlError('Invalid/Expired token', ErrorCodes.Unauthenticated);
      }
    }
    throw makeGraphqlError("Authentication token must be 'Bearer [token]", ErrorCodes.Unauthenticated);
  }
  throw makeGraphqlError('Authorization header must be provided', ErrorCodes.Unauthenticated);
};

export const checkVerified = async (userId) => {
  const user = await UserModel.findById(userId);
  if (user.isConfirmed) return true;
  return false;
};
