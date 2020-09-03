import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { createAccessToken, sendRefreshToken } from '../middlewares';
import { User } from '../entity/User';
import { isAdmin, bannAccount } from '../middlewares/Auth';

export const tokenRouter: Router = Router();

tokenRouter.post('/refresh', async (req, res) => {
	try {
		const token = req.cookies.jid;
		if (!token) {
			throw new Error('not valid login');
		}
		const payload: any = verify(token, config.refreshToken);
		const user = await User.findOne({ id: payload.id });
		if (!user) {
			throw new Error('not valid login');
		}
		if (user.tokenVersion !== payload.tokenVersion) {
			throw new Error('not valid login');
		}
		sendRefreshToken(res, token);
		return res.send({
			error: false,
			accessToken: createAccessToken(user),
		});
	} catch (error) {
		return res.send({ error: true, accessToken: '' });
	}
});

tokenRouter.post('/ban/:user_id', isAdmin, bannAccount, (_, res) => {
	res.send({
		error: false,
		success: true,
	});
});
