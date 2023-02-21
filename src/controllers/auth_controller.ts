import Debug from 'debug'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createUser, loginByEmail } from '../services/user_service'
import { JwtPayload } from '../types'

const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')


export const registerUser = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req)

		if (!validationErrors.isEmpty()) {
			return res.status(400).send({
				status: "fail",
				data: validationErrors.array(),
			})
		}

	const validatedData = matchedData(req)

	const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)

	validatedData.password = hashedPassword

	try {
		const register = await createUser({
			email:      validatedData.email,
			password:   validatedData.password,
			first_name: validatedData.first_name,
			last_name:  validatedData.last_name,
		})

		return res.status(201).send({
			status: "success",
			data: {
			  email: register.email,
			  first_name: register.first_name,
			  last_name: register.last_name
			}
		  })

	} catch (err) {
		return res.status(500).send({
			staus: 'error',
			message: 'Could not create a new user'
		})
	}
}



export const loginUser = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req)

	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	const { email, password } = req.body

	const user = await loginByEmail(email)

	if (!user) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required",
		})
	}

	const result = await bcrypt.compare(password, user.password)

	if (!result) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required",
		})
	}

	const payload: JwtPayload = {
		sub: user.id,
		first_name : user.first_name,
		last_name : user.last_name,
		email: user.email,
		user_id: user.id,
	}


	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "No access token secret defined",
		})
	}

	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h',
	})


	if (!process.env.REFRESH_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "No refresh token secret defined",
		})
	}

	const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1d',
	})

	res.status(200).send({
		status: "success",
		data: {
			access_token: access_token,
			refresh_token: refresh_token
		}
	})
}

/*
	REFRESH TOKEN
*/
	export const refreshToken = (req: Request, res: Response) => {

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
			const payload = (jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "") as unknown) as JwtPayload

			delete payload.iat
			delete payload.exp

			if (!process.env.ACCESS_TOKEN_SECRET) {
				return res.status(500).send({
					status: "error",
					message: "No access token secret defined",
				})
			}
			const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h',
			})

			res.send({
				status: "success",
				data: {
					access_token,
				},
			})

		} catch (err) {
			debug("Token failed verification", err)

			return res.status(401).send({
				status: "fail",
				data: "Authorization required",
			})
		}
	}
