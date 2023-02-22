import { body } from 'express-validator'
import { loginByEmail } from '../services/user_service'

export const registerValidationRules = [
	body('email')
		.trim()
		.toLowerCase()
		.isEmail()
		.withMessage("Not a valid email")
		.custom(async (value: string) => {
			const user = await loginByEmail(value)

			if (user) {
				return Promise.reject("Email already exists")
			}
		})
		.notEmpty()
		.withMessage('Email is required'),

	body('password')
		.trim()
		.isString()
		.withMessage('Password is not a valid string')
		.bail()
		.notEmpty()
		.withMessage('Password is required')
		.bail()
		.isLength({ min: 6})
		.withMessage("Password must be at least 6 characters"),

	body('first_name')
		.trim()
		.isString()
		.toLowerCase()
		.withMessage('First name has to be a string')
		.bail()
		.notEmpty()
		.withMessage("First name is required")
		.bail()
		.isLength({min: 2})
		.withMessage("Has to be at least 2 characters"),

		body('last_name')
		.trim()
		.toLowerCase()
		.isString()
		.withMessage("Last name has to be a string")
		.bail()
		.notEmpty()
		.withMessage("Last name is required")
		.bail()
		.isLength({min: 3})
		.withMessage("Has to be at least 3 characters"),
]

export const loginValidationRules = [
	body('email')
		.trim()
		.toLowerCase()
		.isEmail()
		.withMessage("Not a valid email")
		.bail()
		.notEmpty()
		.withMessage('Email is required'),

	body('password')
		.trim()
		.isString()
		.withMessage('Password is not a valid string')
		.bail()
		.notEmpty()
		.withMessage('Password is required')
		.bail()
		.isLength({ min: 6})
		.withMessage("Password must be at least 6 characters"),
]

