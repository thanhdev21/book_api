import UserModel from '@/models/user';
import { IAuth } from '@/types';

import { RoleCodes } from '@constants/enum';
import { User } from './generated-graphql-types';

export interface GraphQLContext {
  auth: GraphqlContextAuth;
  loaders: ContextLoaders;
}

export interface GraphqlContextAuth extends IAuth {
  clientId?: string;
  role: RoleCodes;
  metaData: {
    nameOfUser?: string;
    user?: User;
  };
}

export interface ContextLoaders {
  users: Loader<User>;
}

export interface Loader<T> {
  load: (key1: any | Array<any>, key2?: any | Array<any>) => Promise<any>;
  loadMany: (keys: Array<number>) => Promise<Array<T>>;
  clear: (key: string | Array<string>) => void;
}
