import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import './alias-modules';
import env from './env';
import schemaWithResolvers from '@graphql/schema';
import { ErrorCodes } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js';
import bodyParser from 'body-parser';

const PORT = env.port ? env.port : 32001;

/**
 *
 * @param auth need to build graphql context
 */

const app = express();
app.use(cors());
app.use('/storage', express.static(__dirname + '/storage'));
app.use(graphqlUploadExpress());
app.use(bodyParser.json());
app.get('/', (_: express.Request, res: express.Response) => {
  return res.send('Hello book-shop Server!');
});

/**
 * create graphql server
 */

const server = new ApolloServer({
  context: ({ req }) => ({ req }),
  formatError: (err) => {
    if (err && err.extensions && err.extensions.exception.code === 'ValidationError') {
      return makeGraphqlError(err.message, ErrorCodes.GraphqlValidationFailed);
    }
    return err;
  },

  schema: schemaWithResolvers,
  // subscriptions: {
  // onConnect: async (connectionParam: any, webSocket, context) => {
  //   try {
  //     const { authorization } = connectionParam;
  //     if (authorization) {
  //       // const auth = await subscriptionsAuthentication(authorization);
  //       // return graphqlContext(auth);
  //     }
  //     throw makeGraphqlError('Missing authorization token', ErrorCodes.Unauthenticated);
  //   } catch (err) {
  //     throw new AuthenticationError(err);
  //   }
  // },
  // },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
});

// apply app to apollo middleware
const httpServer = createServer(app);

/**
 * func to start server
 */
const run = async () => {
  await mongoose.connect(process.env.MONGODB_URL, {}).then(async () => {
    console.log(`🌧️  Mongodb connected 🌧️`);
  });
  // server.installSubscriptionHandlers(httpServer);
  await server.start();
  server.applyMiddleware({ app, cors: true });
  httpServer.listen(PORT);
  return httpServer;
};

/**
 * server will be start if run without test mode
 */
if (process.env.NODE_ENV !== 'test') {
  run()
    .then(() => {
      console.log(`🍼  🚀  GraphQL server listen at: http://localhost:${PORT || 32001}/graphql`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { httpServer, run };
