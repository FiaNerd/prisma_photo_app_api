/**
 * Controller Template
 */
import Debug from 'debug'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createUser, getUserByEmail } from '../services/user_service'
import { JwtPayload } from '../types'
// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body

	const user = await getUserByEmail(email)

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
		name: user.first_name,
		email: user.email,
	}


	// TODO: SE om du kan flytta denna till server filen eller app filen istället, så den säger till tidigare att om man inte hat genererat någon acces token
	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "No access token secret defined",
		})
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET )

	res.status(200).send({
		status: "success",
		data: {
			access_token: access_token
		}
	})
}


export const registerUser = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}
	const validatedData = matchedData(req)
	console.log("req body", req.body);
	console.log("validate data", validatedData);

	const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
	console.log("Hashed password:", hashedPassword)

	validatedData.password = hashedPassword

	try {
		const register = await createUser({
			email:      validatedData.email,
			password:   validatedData.password,
			first_name: validatedData.first_name,
			last_name:  validatedData.last_name,
		})

		 res.status(201).send({
			status: 'success',
			message: register,
		})

	} catch (err) {
		return res.status(500).send({
			staus: 'error',
			message: 'Could not create a new user'
		})
	}
}
