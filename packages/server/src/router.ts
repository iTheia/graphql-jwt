import { Router } from 'express';
import { tokenRouter } from './routes/token';

export const router: Router = Router();

router.use('/auth', tokenRouter);
