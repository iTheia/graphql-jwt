import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/context';
import { verify } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { config } from '../config';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	try {
		const authorization = context.req.headers['authorization'];
		if (!authorization) {
			throw new Error('you must sign in');
		}
		const token = authorization.split(' ')[1];
		const payload = verify(token, config.accessToken);
		context.payload = payload as any;
	} catch (error) {
		throw new Error('no auth');
	}
	return next();
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorization = req.headers['authorization'];
		if (!authorization) {
			throw new Error('you must sign in');
		}
		const token = authorization.split(' ')[1];
		const payload: any = verify(token, config.accessToken);
		const user = await User.findOne(payload.id);
		if (!user) {
			throw new Error('error');
		}
		if (user.role !== 'admin') {
			throw new Error('error');
		}
		return next();
	} catch (error) {
		if (error instanceof Error) {
			return res.send({
				error: true,
				message: error.message,
			});
		}
		return res.send({
			error: true,
			message: error.message,
		});
	}
};

export const bannAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user_id } = req.params;
		await getConnection()
			.getRepository(User)
			.increment({ id: user_id }, 'tokenVersion', 1);

		return next();
	} catch (error) {
		return res.send({
			error: true,
			success: false,
		});
	}
};
