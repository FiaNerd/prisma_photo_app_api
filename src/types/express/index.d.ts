import { JwtPayload } from './../../types.d'
import { Request, Response } from 'express';

declare global {
	namespace Express {
		export interface Request {
			token?: JwtPayload,
		}
	}
}

