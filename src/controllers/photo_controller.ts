import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createPhoto, getPhotos, getPhotoById, updatePhoto, deletePhoto } from '../services/photo_service'

const debug = Debug('prisma_photo_app_api:photo_controller')

	/*
		Get all photos
	*/
	export const index = async (req: Request, res: Response) => {

		const user_id = req.token ? req.token.user_id : NaN;

		try {
			const photos = await getPhotos(user_id);

			const newPhotos = photos.map(photo => {
		     const { user_id, ...newPhoto } = photo;
				  return newPhoto;
				});

				return res.status(200).send({
				  status: "success",
				  data: newPhotos
				})

		} catch (err) {

			return res.status(500).send({
				status: 'error',
				message: 'Internal Server Error, could not retrieve photos'
			})
			}
		}

	/*
		Get a single photo
	*/
	export const show = async (req: Request, res: Response) => {

		const photoId = Number(req.params.photoId)

		const user_id = req.token ? req.token.user_id : NaN;

		try {
			const photo = await getPhotoById(photoId);

			if (!photo) {
				return res.status(404).send({
					status: "fail",
					message: `Photo not found with ID: [${photoId}]`
				});
			}

			if (photo.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to access this photo ID: [${photoId}]`
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
				message: 'Internal Server Error, could not retrieve photo',
			});
		}
	};

	/**
	 * Create a photo
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
			return res.status(500).send({
				staus: 'error',
				message: 'Internal Server Error, could not retrieve photos'
			})
		}
	}


	/**
	 * Update a photo
	 */
	export const update = async (req: Request, res: Response) => {

		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
		  return res.status(400).send({
			status: 'fail',
			data: validationErrors.array(),
		  });
		}

		const photoId = Number(req.params.photoId);
		const user_id = req.token ? req.token.user_id : NaN;
		const validatedData = matchedData(req);

		const photo = await getPhotoById(photoId);

		if (!photo) {
		  return res.status(404).send({
			status: 'fail',
			message: `Photo not found with id: [${photoId}]`,
		  });
		}

		if (photo.user_id !== user_id) {
		  return res.status(401).send({
			status: 'fail',
			message: `Not authorized to update this photo ID: [${photoId}]`,
		  });
		}


		try {
		  const updatedPhoto = await updatePhoto(photoId, validatedData);

		  return res.status(200).send({
			status: 'success',
			data: {
			  id: photoId,
			  title: updatedPhoto.title,
			  url: updatedPhoto.url,
			  comment: updatedPhoto.comment,
			  user_id: updatedPhoto.user_id,
			},
		  });
		} catch (err) {
		  return res.status(500).send({
			status: 'error',
			message: 'Internal Server Error, could not update photo',
		  });
		}
	  };


	/**
	 * Delete a photo
	 */
	export const destroy = async (req: Request, res: Response) => {

		const photoId = Number(req.params.photoId)

		const user_id = req.token ? req.token.user_id : NaN;

		const photo = await getPhotoById(photoId);

			if (!photo) {
				return res.status(404).send({
					status: "fail",
					message: `There is no photo with ID: [${photoId}]`
				});
			}

			if (photo.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to delet this photo ID: [${photoId}]`
				});
			}


		try {
			await deletePhoto(photoId)

			return res.status(200).send({
				status: "success",
				data: null,
		  });

		} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: 'Internal Server Error, could not retrieve photos'
		})
	  }
	}

