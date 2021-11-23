import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTAuthTokenType } from '@utils/jwt';

import { GraphqlContextAuth } from '@graphql/types/graphql';

import UserModel from '@/models/user';
import { RoleCodes, User } from '@graphql/types/generated-graphql-types';

export default {
  async process(
    req: Request & {
      auth?: GraphqlContextAuth;
    },
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.headers.authorization || !req.headers.authorization.replace('Bearer', '')) {
        return next();
      }
      const decodedToken = await verifyToken(req.headers.authorization.replace('Bearer', ''));
      if (decodedToken.type === JWTAuthTokenType.ID_TOKEN && decodedToken && decodedToken.uid) {
        const { clientId, uid, nameOfUser } = decodedToken;

        const user: User = await UserModel.findById(decodedToken.uid);

        if (user) {
          req.auth = {
            uid: user._id,
            role: RoleCodes.USER,
            ipAddress: req.headers['x-real-ip'] || req.connection.remoteAddress,
            metaData: { user: user },
          };
        }
      }
      return next();
    } catch (err) {
      return next();
    }
  },
};
