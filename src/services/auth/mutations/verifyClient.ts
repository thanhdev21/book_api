import { MutationResolvers, ClientJwt, RoleCodes, ErrorCodes } from '@graphql/types/generated-graphql-types';
import { getClient } from '@business/auth';
import { makeGraphqlError } from '@utils/error';
import { signClientAuthToken } from '@utils/jwt';
import mongoose from 'mongoose'

export const verifyClient: MutationResolvers['verifyClient'] = async (_, { data }) => {
  const { clientId, secretKey, nameOfUser } = data;
  const client = await getClient({ clientId, secretKey });
  if (!client) {
    throw makeGraphqlError('Unauthenticated', ErrorCodes.Unauthenticated);
  }

  const response = await buildClientJWTResponse({ clientId, nameOfUser, uid: client.id, role: RoleCodes.CLIENT });
  return response;
};

export const buildClientJWTResponse = async (input: { uid: mongoose.Schema.Types.ObjectId; clientId: string; nameOfUser: string; role: RoleCodes }): Promise<ClientJwt> => {
  const { uid, clientId, nameOfUser, role } = input;
  const token = await signClientAuthToken({ clientId, uid, nameOfUser, role });
  return {
    expiresAt: token.expiresAt,
    refreshToken: token.refreshToken,
    token: token.token,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    payload: {
      nameOfUser,
    },
  };
};
