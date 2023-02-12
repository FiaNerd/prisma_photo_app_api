import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'

import { createAlbum } from '../services/album_service'

const debug = Debug('prisma_photo_app_api:photo_contoller')


/**
 * Create store album
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

	const user_id = req.token ? req.token.user_id : NaN;

	if (!req.token || isNaN(req.token.user_id)) {
		return res.status(401).send({
		  status: "fail",
		  message: "User is not authenticated"
		});
	  }

	try {
		  const album = await createAlbum({
			title: validatedData.title,
			user_id,
		  });

		  return res.status(201).send({
			status: "success",
			data: album
		  });

	} catch (err) {

		return res.status(500).send({
			staus: 'error',
			message: 'Sorry, the server is down'
		})
	}
}
