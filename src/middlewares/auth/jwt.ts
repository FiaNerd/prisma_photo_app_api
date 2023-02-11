import jwt from 'jsonwebtoken'
import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'

const debug = Debug('prsima_photo_app_api:jwt')

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	debug('Hello from auth jwt')

	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	const [authSchema, token] = req.headers.authorization.split(" ")

	if (authSchema.toLowerCase() !== "bearer") {
		debug("Authorization schema isn't Bearer")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	try {


	} catch (err) {
		debug("Token failed verification", err)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	next()
}
