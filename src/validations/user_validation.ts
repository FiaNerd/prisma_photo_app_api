import { body } from 'express-validator'

export const registerValidationRules = [
	body('email')
		.trim()
		.toLowerCase()
		.isEmail()
		.withMessage("Not a valid email")
		.bail(),

	body('password')
		.isString()
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
		.withMessage("It's required to add a first name")
		.bail()
		.isLength({min: 2})
		.withMessage("Has to be at least 2 characters")
		.bail(),

		body('last_name')
		.trim()
		.toLowerCase()
		.isString()
		.withMessage("Last name has to be a string")
		.bail()
		.notEmpty()
		.withMessage("It's required to add a last name")
		.bail()
		.isLength({min: 3})
		.withMessage("Has to be at least 3 characters")
		.bail(),
]

