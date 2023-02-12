import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { title } from 'process'
import { createPhoto, getPhotos, getPhotoById, updatePhoto } from '../services/photo_service'

const debug = Debug('prisma_photo_app_api:photo_contoller')

export const index = async (req: Request, res: Response) => {

	const user_id = req.token ? req.token.user_id : NaN;

	if (!req.token || isNaN(req.token.user_id)) {
	  return res.status(401).send({
		status: "fail",
		message: "User is not authenticated"
	  });
	}

	try {
	  const photos = await getPhotos(user_id);

	  const filteredPhotos = photos.map(photo => ({
		id: photo.id,
		title: photo.title,
		url: photo.url,
		comment: photo.comment
	  }));

	  return res.status(200).send({
		status: "success",
		data: filteredPhotos
	  });

	} catch (err) {
	  console.error("Error thrown when finding photos: ", err)

	  return res.status(500).send({
		status: 'error',
		message: 'Could not retrieve photos'
	  })
	}
  }
	export const show = async (req: Request, res: Response) => {

		const photoId = Number(req.params.photoId)

		const user_id = req.token ? req.token.user_id : NaN;

		if (!req.token || isNaN(req.token.user_id)) {
		return res.status(401).send({
			status: "fail",
			message: "User is not authenticated"
		});
		}

		try {
		const photo = await getPhotoById(photoId);

		if (!photo) {
			return res.status(404).send({
			status: "fail",
			message: "Photo not found"
			});
		}

		if (photo.user_id !== user_id) {
			return res.status(403).send({
			status: "fail",
			message: "Not authorized to access this photo"
			});
		}

		return res.status(200).send({
			status: "success",
			data: {
			  id: photo.id,
			  title: photo.title,
			  url: photo.url,
			  comment: photo.comment
			}
		  });

		} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: 'Could not get the photo'
		});
		}
	};

/**
 * Create store photo
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
		  const photo = await createPhoto({
			title: validatedData.title,
			url: validatedData.url,
			comment: validatedData.comment,
			user_id,
		  });

		  return res.status(201).send({
			status: "success",
			data: photo
		  });

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

	const photoId = Number(req.params.photoId)

	const user_id = req.token ? req.token.user_id : NaN;

	if (!req.token || isNaN(req.token.user_id)) {
	  return res.status(401).send({
		status: "fail",
		message: "User is not authenticated"
	  });
	}
	const validatedData = matchedData(req)
	try {
	  const patchPhoto = await updatePhoto(photoId, validatedData);

	  return res.status(200).send({
		status: "success",
		data: {
			title: patchPhoto.title,
			comment: patchPhoto.comment
		}
	  });

	} catch (err) {
	  console.error("Error thrown when finding photos: ", err)

	  return res.status(500).send({
		status: 'error',
		message: 'Could not retrieve photos'
	  })
	}
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
