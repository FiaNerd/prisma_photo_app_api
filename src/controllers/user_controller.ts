/**
 * Controller Template
 */
import Debug from 'debug'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createUser } from '../services/user_service'
// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Create a resource
 */
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

	// Replace password with hashed password

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
