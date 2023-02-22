import { JwtPayload } from './../../types.d'

declare global {
	namespace Express {
		export interface Request {
			token?: JwtPayload,
		}
	}
}

