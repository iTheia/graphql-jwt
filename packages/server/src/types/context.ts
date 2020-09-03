import { Request, Response } from 'express';

export interface MyContext {
	req: Request;
	res: Response;
	payload?: { id: string };
}
export interface ExpressContext {
	req: RequestWhitUserInfo;
	res: Response;
}

export interface RequestWhitUserInfo extends Request {
	userInfo: any;
}
