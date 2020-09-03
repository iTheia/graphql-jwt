import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';
import { config } from '../config';
import { Response } from 'express';

export const createAccessToken = (user: User) => {
	return sign({ id: user.id }, config.accessToken, {
		expiresIn: '15m',
	});
};

export const createRefreshToken = (user: User) => {
	return sign(
		{ id: user.id, tokenVersion: user.tokenVersion },
		config.refreshToken,
		{
			expiresIn: '7d',
		}
	);
};

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie('jid', token, {
		httpOnly: true,
	});
};
