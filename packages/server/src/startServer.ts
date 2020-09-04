import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolver/UserResolver';
import { config } from './config';
import { router } from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const startServer = async () => {
	try {
		const app = express();
		const server = createServer(app);

		app.use(cookieParser());
		app.use(
			cors({
				credentials: true,
				origin: 'http://localhost:3000',
			})
		);
		app.use(router);

		await createConnection();
		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver],
			}),
			context: ({ req, res }) => ({ req, res }),
		});
		apolloServer.applyMiddleware({ app, cors: false });
		server.listen(config.port);
	} catch (error) {
		console.log(error);
	}
};
