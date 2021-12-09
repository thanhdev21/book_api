import { RoleCodes } from '@constants/enum';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from './graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: any;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Mockup: any;
  Upload: any;
};

export type BaseMedia = {
  __typename?: 'BaseMedia';
  height: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type Book = {
  __typename?: 'Book';
  _id: Scalars['ID'];
  author: Scalars['String'];
  category: Array<Category>;
  coverPhoto: Media;
  createdAt?: Maybe<Scalars['Date']>;
  description: Scalars['String'];
  isbn: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
  uploadedBy: User;
};

export type Books = {
  __typename?: 'Books';
  items: Array<Book>;
  paginate?: Maybe<Paginate>;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  description: Scalars['String'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ClientJwt = {
  __typename?: 'ClientJWT';
  expiresAt: Scalars['Int'];
  payload?: Maybe<ClientPayload>;
  refreshToken: Scalars['String'];
  refreshTokenExpiresAt: Scalars['Int'];
  token: Scalars['String'];
};

export type ClientPayload = {
  __typename?: 'ClientPayload';
  nameOfUser: Scalars['String'];
};

export type CreateBookInput = {
  author: Scalars['String'];
  category: Array<Scalars['ID']>;
  coverPhoto?: InputMaybe<Scalars['ID']>;
  description: Scalars['String'];
  isbn: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCategoryInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export enum ErrorCodes {
  BadUserInput = 'BAD_USER_INPUT',
  Forbidden = 'FORBIDDEN',
  GraphqlParseFailed = 'GRAPHQL_PARSE_FAILED',
  GraphqlValidationFailed = 'GRAPHQL_VALIDATION_FAILED',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  OtpExpire = 'OTP_EXPIRE',
  Unauthenticated = 'UNAUTHENTICATED'
}

export type Jwt = {
  __typename?: 'JWT';
  expiresAt: Scalars['Int'];
  payload?: Maybe<User>;
  refreshToken: Scalars['String'];
  refreshTokenExpiresAt: Scalars['Int'];
  token: Scalars['String'];
  uid?: Maybe<Scalars['ID']>;
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ID'];
  createdAt: Scalars['Int'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  fileName: Scalars['String'];
  fileType?: Maybe<Scalars['String']>;
  originUrl?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  size?: Maybe<Scalars['Int']>;
  status: MediaStatus;
  title?: Maybe<Scalars['String']>;
  type: MediaType;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type MediaFilterInput = {
  query?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MediaType>;
};

export enum MediaStatus {
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Ready = 'READY'
}

export enum MediaType {
  File = 'FILE',
  Other = 'OTHER',
  Photo = 'PHOTO',
  Video = 'VIDEO'
}

export type Medias = {
  __typename?: 'Medias';
  items: Array<Media>;
  paginate?: Maybe<Paginate>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: Jwt;
  createBook: Book;
  createCategory: Category;
  forgotPassword: Scalars['Boolean'];
  login: Jwt;
  logout: Scalars['Boolean'];
  refreshToken: Jwt;
  register: Scalars['Boolean'];
  resendOtp: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  updateCategory: Category;
  updateMedia: Media;
  updateUserStatus: User;
  uploadMedia: Media;
  verifyEmail: Scalars['Boolean'];
};


export type MutationAdminLoginArgs = {
  input: MutationLoginInput;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: MutationLoginInput;
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationResendOtpArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateMediaArgs = {
  data: UpdateMediaInput;
};


export type MutationUpdateUserStatusArgs = {
  input: UpdateUserStatusInput;
};


export type MutationUploadMediaArgs = {
  file: Scalars['Upload'];
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MutationLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Paginate = {
  __typename?: 'Paginate';
  pageIndex?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
  totalItems?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getAllBooks: Books;
  getAllCategories: Array<Category>;
  getAllMedia: Medias;
  getAllUsers: Users;
  getBook: Book;
  getCategory: Category;
  getMedia: Media;
  getUser: User;
  me?: Maybe<User>;
};


export type QueryGetAllBooksArgs = {
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllMediaArgs = {
  filter?: InputMaybe<MediaFilterInput>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllUsersArgs = {
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};


export type QueryGetBookArgs = {
  id: Scalars['ID'];
};


export type QueryGetCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryGetMediaArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export { RoleCodes };

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateMediaInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserStatusInput = {
  id: Scalars['ID'];
  status: UserStatus;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  confirmOTP?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  isConfirmed: Scalars['Boolean'];
  lastName: Scalars['String'];
  otpExpireAt?: Maybe<Scalars['Int']>;
  otpTries?: Maybe<Scalars['Boolean']>;
  password: Scalars['String'];
  role: Scalars['Int'];
  status: UserStatus;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Users = {
  __typename?: 'Users';
  items: Array<User>;
  paginate?: Maybe<Paginate>;
};

export type VerifyClientInput = {
  clientId: Scalars['String'];
  nameOfUser: Scalars['String'];
  secretKey: Scalars['String'];
};

export type VerifyEmailInput = {
  email: Scalars['String'];
  otp: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BaseMedia: ResolverTypeWrapper<BaseMedia>;
  Book: ResolverTypeWrapper<Book>;
  Books: ResolverTypeWrapper<Books>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  ClientJWT: ResolverTypeWrapper<ClientJwt>;
  ClientPayload: ResolverTypeWrapper<ClientPayload>;
  CreateBookInput: CreateBookInput;
  CreateCategoryInput: CreateCategoryInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ErrorCodes: ErrorCodes;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JWT: ResolverTypeWrapper<Jwt>;
  Media: ResolverTypeWrapper<Media>;
  MediaFilterInput: MediaFilterInput;
  MediaStatus: MediaStatus;
  MediaType: MediaType;
  Medias: ResolverTypeWrapper<Medias>;
  Mockup: ResolverTypeWrapper<Scalars['Mockup']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationLoginInput: MutationLoginInput;
  Order: Order;
  Paginate: ResolverTypeWrapper<Paginate>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  RoleCodes: RoleCodes;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateMediaInput: UpdateMediaInput;
  UpdateUserStatusInput: UpdateUserStatusInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserStatus: UserStatus;
  Users: ResolverTypeWrapper<Users>;
  VerifyClientInput: VerifyClientInput;
  VerifyEmailInput: VerifyEmailInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BaseMedia: BaseMedia;
  Book: Book;
  Books: Books;
  Boolean: Scalars['Boolean'];
  Category: Category;
  ClientJWT: ClientJwt;
  ClientPayload: ClientPayload;
  CreateBookInput: CreateBookInput;
  CreateCategoryInput: CreateCategoryInput;
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JWT: Jwt;
  Media: Media;
  MediaFilterInput: MediaFilterInput;
  Medias: Medias;
  Mockup: Scalars['Mockup'];
  Mutation: {};
  MutationLoginInput: MutationLoginInput;
  Paginate: Paginate;
  Query: {};
  RegisterInput: RegisterInput;
  String: Scalars['String'];
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateMediaInput: UpdateMediaInput;
  UpdateUserStatusInput: UpdateUserStatusInput;
  Upload: Scalars['Upload'];
  User: User;
  Users: Users;
  VerifyClientInput: VerifyClientInput;
  VerifyEmailInput: VerifyEmailInput;
};

export type AuthDirectiveArgs = {
  requires?: Maybe<Array<Maybe<RoleCodes>>>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BaseMediaResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BaseMedia'] = ResolversParentTypes['BaseMedia']> = {
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  coverPhoto?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  uploadedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BooksResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Books'] = ResolversParentTypes['Books']> = {
  items?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>;
  paginate?: Resolver<Maybe<ResolversTypes['Paginate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientJwtResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ClientJWT'] = ResolversParentTypes['ClientJWT']> = {
  expiresAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['ClientPayload']>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshTokenExpiresAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ClientPayload'] = ResolversParentTypes['ClientPayload']> = {
  nameOfUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type JwtResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JWT'] = ResolversParentTypes['JWT']> = {
  expiresAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshTokenExpiresAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MediaStatus'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediasResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Medias'] = ResolversParentTypes['Medias']> = {
  items?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>;
  paginate?: Resolver<Maybe<ResolversTypes['Paginate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MockupScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Mockup'], any> {
  name: 'Mockup';
}

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  adminLogin?: Resolver<ResolversTypes['JWT'], ParentType, ContextType, RequireFields<MutationAdminLoginArgs, 'input'>>;
  createBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationCreateBookArgs, 'input'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  forgotPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  login?: Resolver<ResolversTypes['JWT'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLogoutArgs, 'refreshToken'>>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>;
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  resendOtp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResendOtpArgs, 'email'>>;
  resetPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'token'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'input'>>;
  updateMedia?: Resolver<ResolversTypes['Media'], ParentType, ContextType, RequireFields<MutationUpdateMediaArgs, 'data'>>;
  updateUserStatus?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserStatusArgs, 'input'>>;
  uploadMedia?: Resolver<ResolversTypes['Media'], ParentType, ContextType, RequireFields<MutationUploadMediaArgs, 'file'>>;
  verifyEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'input'>>;
};

export type PaginateResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Paginate'] = ResolversParentTypes['Paginate']> = {
  pageIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllBooks?: Resolver<ResolversTypes['Books'], ParentType, ContextType, RequireFields<QueryGetAllBooksArgs, 'pageIndex' | 'pageSize'>>;
  getAllCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  getAllMedia?: Resolver<ResolversTypes['Medias'], ParentType, ContextType, RequireFields<QueryGetAllMediaArgs, 'pageIndex' | 'pageSize'>>;
  getAllUsers?: Resolver<ResolversTypes['Users'], ParentType, ContextType, RequireFields<QueryGetAllUsersArgs, 'pageIndex' | 'pageSize'>>;
  getBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<QueryGetBookArgs, 'id'>>;
  getCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryGetCategoryArgs, 'id'>>;
  getMedia?: Resolver<ResolversTypes['Media'], ParentType, ContextType, RequireFields<QueryGetMediaArgs, 'id'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RoleCodesResolvers = EnumResolverSignature<{ ADMIN?: any, CONTENT_CREATOR?: any, USER?: any }, ResolversTypes['RoleCodes']>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  confirmOTP?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isConfirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otpExpireAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  otpTries?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = {
  items?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  paginate?: Resolver<Maybe<ResolversTypes['Paginate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  BaseMedia?: BaseMediaResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Books?: BooksResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  ClientJWT?: ClientJwtResolvers<ContextType>;
  ClientPayload?: ClientPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JWT?: JwtResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Medias?: MediasResolvers<ContextType>;
  Mockup?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Paginate?: PaginateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RoleCodes?: RoleCodesResolvers;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Users?: UsersResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = GraphQLContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
