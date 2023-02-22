import { body } from 'express-validator'

	export const photoValidationRules = [
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
			.withMessage('Title must be at least 3 chars long'),

		body('url')
			.isURL()
			.withMessage('Inavlid, must be an url')
			.bail()
			.notEmpty()
			.withMessage('Url is required'),

		body('comment')
			.optional()
			.isString()
			.withMessage('Inavlid, must be a string')
			.bail()
			.notEmpty()
			.withMessage('Comment kan not be empty')
			.bail()
			.isLength({ min: 3})
			.withMessage('Comments must be at least 3 chars long'),
	]


	export const updatePhotoValidationRules = [
		body('title')
			.optional()
			.trim()
			.toLowerCase()
			.isString()
			.withMessage('Title must be a string')
			.bail()
			.notEmpty()
			.withMessage('Title is required')
			.bail()
			.isLength({min: 3})
			.withMessage('Title must be at least 3 chars long'),

		body('url')
			.optional()
			.isURL()
			.withMessage('Inavlid, must be an url')
			.bail()
			.notEmpty()
			.withMessage('Url is required'),

		body('comment')
			.optional()
			.isString()
			.withMessage('Inavlid, must be a string')
			.bail()
			.notEmpty()
			.withMessage('Comment kan not be empty')
			.bail()
			.isLength({ min: 3})
			.withMessage('Comments must be at least 3 chars long')
	]

