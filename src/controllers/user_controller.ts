/**
 * Controller Template
 */
import Debug from 'debug'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createUser } from '../services/user_service'
// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Create a resource
 */
export const registerUser = async (req: Request, res: Response) => {

	const reqBody = req.body

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	try {
		const register = await createUser({
			email:      reqBody.email,
			password:   reqBody.password,
			first_name: reqBody.first_name,
			last_name:  reqBody.last_name,
		})

		res.status(201).send({
			status: 'success',
			mesage: register,
		})

	} catch (err) {
		res.status(500).send({
			staus: 'fail',
			message: 'Could not create a new user'
		})
	}


}
