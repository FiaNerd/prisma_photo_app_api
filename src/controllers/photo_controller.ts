import Debug from 'debug'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createPhoto } from '../services/photo_service'

const debug = Debug('prisma_photo_app_api:photo_contoller')

export const index = async (req: Request, res: Response) => {

}

/**
 * Get a single resource
 */
export const show = async (req: Request, res: Response) => {
}

/**
 * Create a resource
 */
export const store = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	const validatedData = matchedData(req)

	try {
		const photo = await createPhoto({
			title:   validatedData.title,
			url:     validatedData.url,
			comment: validatedData.comment,
			user_id: Number(validatedData.user_id),
		})

		return res.status(201).send({
			status: "success",
			data: {
			  photo: photo
			}
		  })

	} catch (err) {
		debug("Error thrown when finding book with id %o: %o",)
		console.error("Error thrown when creating a photo: ", err)

		return res.status(500).send({
			staus: 'error',
			message: 'Could not create a new photo'
		})
	}
}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
