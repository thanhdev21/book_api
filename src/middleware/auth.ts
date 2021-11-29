import UserModel from '@/models/user';
import UserTokenModel from '@/models/userToken';
import { ErrorCodes } from '@graphql/types/generated-graphql-types';
import { GraphQLContext } from '@graphql/types/graphql';
import { makeGraphqlError } from '@utils/error';
import { verifyToken } from '@utils/jwt';
import { AuthenticationError } from 'apollo-server-express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function requiredAuth<T>(next: T) {
  return (obj: any, args: any, context: GraphQLContext, info: any) => {
    if (!context.auth) throw new AuthenticationError('Unauthenticated!');
    if (args.limit && (args.limit as number) > 100) {
      args.limit = 100;
    }
    if (typeof args.limit !== undefined && (args.limit as number) < 0) {
      args.limit = 10;
    }
    const nextFunc = next as any;
    return nextFunc(obj, args, context, info);
  };
}

export const checkAuth = async (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user: JwtPayload = await verifyToken(token);
        const accessToken = await UserTokenModel.findById(user.tokenId);
        if (!accessToken) throw makeGraphqlError('Invalid/Expired token', ErrorCodes.Unauthenticated);
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
