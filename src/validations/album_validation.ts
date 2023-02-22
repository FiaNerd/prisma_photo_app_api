import { body } from 'express-validator'

export const albumValidationRules = [
	body('title')
		.trim()
		.toLowerCase()
		.isString()
		.withMessage('Title must be a string')
		.bail()
		.notEmpty()
		.withMessage('Title is required')
		.bail()
		.isLength({min: 3})
		.withMessage('Title must be at least 3 chars long')
]

