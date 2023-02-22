import express from 'express'
import { photoValidationRules, updatePhotoValidationRules } from '../validations/photo_validation'
import { index, show, store, update, destroy } from '../controllers/photo_controller'


	const router = express.Router()

	/**
	 * GET /photos
	 */
	router.get('/', photoValidationRules, index)

	/**
	 * GET /photos/:photoId
	 */
	router.get('/:photoId', photoValidationRules, show)

	/**
	 * POST /photos
	 */
	router.post('/', photoValidationRules, store)

	/**
	 * PATCH /photos/:photoId
	 */
	router.patch('/:photoId',updatePhotoValidationRules, update)


	/**
	 * DELETE /photos/:photoId
	 */
	router.delete('/:photoId', photoValidationRules, destroy)

	export default router
