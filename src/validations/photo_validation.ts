import { body } from 'express-validator'

export const photoValidationRules = [
	body('title')
		.trim()
		.toLowerCase()
		.isString()
		.withMessage('Title must be a string')
		.bail()
		.isLength({min: 3})
		.withMessage('Title must be at least 3 chars long'),

	body('url')
		.isURL()
		.withMessage('Inavlid, must be an url'),

	body('comment')
		.isString()
		.withMessage('Inavlid, must be a string')
		.bail()
		.isLength({ min: 3})
		.withMessage('Commens must be at least 3 chars long')
]

