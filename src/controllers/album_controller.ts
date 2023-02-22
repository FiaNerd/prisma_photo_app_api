
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import {  getAlbums, getAlbumById, createAlbum, updateAlbum, createPhotosToAlbum, disconnectPhotoFromAlbum, deleteAlbum } from '../services/album_service'
import {  getPhotoById } from '../services/photo_service'

	const debug = Debug('prisma_photo_app_api:album_controller');


	/**
	* 	Get all albums
	*/
	export const index = async (req: Request, res: Response) => {

		const user_id = req.token ? req.token.user_id : NaN;

		try {
			const albums = await getAlbums(user_id);

			return res.status(200).send({
				status: "success",
				data: albums
			});

		} catch (err) {

			return res.status(500).send({
				status: 'error',
				message: 'Internal Server Error, could not retrieve photos'
			})
			}
		}


	/**
	 *  Get a sinlge a album
	 */
	export const show = async (req: Request, res: Response) => {

		const albumId = Number(req.params.albumId)

		const user_id = req.token ? req.token.user_id : NaN;

		try {
			const album = await getAlbumById(albumId);

			if (!album) {
				return res.status(404).send({
					status: "fail",
					message: `Album not found with ID: [${albumId}]`
				});
			}

			if (album.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to access this album with ID: [${albumId}]`
				});
			}

			return res.status(200).send({
				status: "success",
				data: {
					id: album.id,
					title: album.title,
					photos: album.photos
				}
			});

		} catch (err) {
			return res.status(500).send({
				status: 'error',
				message: 'Internal Server Error, could not retrieve photos'
			});
			}
		};


	/**
	*  Create a album
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


	/**
	*	Update a album
	*/
	export const update = async (req: Request, res: Response) => {

		const validationErrors = validationResult(req)

			if (!validationErrors.isEmpty()) {
				return res.status(400).send({
					status: "fail",
					data: validationErrors.array(),
				})
			}

		const albumId = Number(req.params.albumId)
		const user_id = req.token ? req.token.user_id : NaN;
		const validatedData = matchedData(req)

		const album = await getAlbumById(albumId)

			if (!album) {
				return res.status(404).send({
					status: "fail",
					message: `There is no album with ID: [${albumId}]`
				});
			}

			if (album.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to update this album ID: [${albumId}]`
				});
			}

		try {
			const patchAlbum = await updateAlbum(albumId, validatedData);

			if (patchAlbum.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to update this album ID: [${albumId}]`
				});
			}

			return res.status(200).send({
				status: "success",
				data: {
					id: albumId,
					title: patchAlbum.title,
					user_id
				}
			});

		} catch (err) {
			return res.status(500).send({
				staus: 'error',
				message: 'Internal Server Error, could not retrieve album'
			})
		}
	}


	/**
	*	Add photo to a album
	*/
	export const addPhotoToAlbum = async (req: Request, res: Response) => {

		const photoIds: number[] = req.body.photo_id
		const albumId = Number(req.params.albumId)
		const user_id = req.token ? req.token.user_id : NaN;

		const album = await getAlbumById(albumId);

			if (!album) {
				return res.status(400).send({
					status: "fail",
					message: `There is no album with that id: ${albumId}`
				});
			}

			if (!photoIds || photoIds.length === 0) {
				return res.status(400).send({
					status: "fail",
					message: "You have to add a photo"
			 	});
			}

		const existingPhotoIds = album.photos
			.filter(photo => photoIds.includes(photo.id))
			.map(photo => photo.id);

			if (existingPhotoIds.length > 0) {
				return res.status(400).send({
					status: "fail",
					message: `The album already contains photos with the following IDs: [${existingPhotoIds.join(", ")}]`
				});
			}

			if (album.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to add a photo to this album ID: [${albumId}]`
				});
			}

			if (!Array.isArray(photoIds) || !photoIds.every(id => typeof id === 'number')) {
				return res.status(400).send({
				status: "fail",
				message: `Photo IDs must be numeric`
				});
			}

			for (const photoId of photoIds) {

				const photo = await getPhotoById(photoId)

				if (!photo) {
					return res.status(404).send({
						status: "fail",
						message: `There is no photo with ID: [${photoId}]`
					})
				}

				if (photo.user_id !== user_id) {
					return res.status(401).send({
						status: "fail",
						message: `User is not authorized to access this photo with ID: [${photoId}]`
					})
				}
			}

		try {

			await createPhotosToAlbum(albumId, photoIds)

			return res.status(200).send({
				status: "success",
				data: null
			});

		} catch (err) {
				return res.status(500).send({
					staus: 'error',
					message: 'Internal Server Error, could not retrieve album'
			})
		}
	}


	/**
	* 	Delete a photo from album (!photo itself)
	*/
	export const removePhotoFromAlbum = async (req: Request, res: Response) => {

		const albumId = Number(req.params.albumId);
		const photoId = Number(req.params.photoId);

		const user_id = req.token ? req.token.user_id : NaN;

		try {
			const album = await getAlbumById(albumId);

			if (!album ) {
				return res.status(404).send({
					status: "fail",
					message: `Album with ID: [${ albumId }] not
					found`
				})
			}

			const photo = await getPhotoById(photoId);

			if (!photo) {
		   return res.status(404).send({
			   status: "fail",
			   message: `Photo with ID: [${ photoId }] not found`
			   });
		   }


			if (album.user_id !== user_id && photo.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to remove this photo ID: [${photoId}] from [${albumId}]`
				})
			}
		    if (album.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to album ID: [${albumId}]`
				})
			}
			 if (photo.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to remove this photo ID: [${photoId}]`
				})
			 }

			await disconnectPhotoFromAlbum(albumId, photoId);

				return res.status(200).send({
					status: "success",
				    data: null
				})

		} catch (err) {
			return res.status(500).send({
				status: "error",
				message: 'Internal Server Error, could not retrieve album'
			})
		}
	}


	export const destroy = async (req: Request, res: Response) => {

		const albumId = Number(req.params.albumId);

		const user_id = req.token ? req.token.user_id : NaN;

		try {

			const album = await getAlbumById(albumId)

			if (!album) {
				return res.status(404).send({
					status: "fail",
					message: `Album with ID: [${ albumId }] not found`
				});
			}

			if (album.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: `Not authorized to delete this album ID: [${albumId}]`
				});
			}
			await deleteAlbum(albumId);

			res.status(200).send({
				status: "success",
				data: null
			});

		} catch (err) {
			return res.status(500).send({
				status: "error",
				message: 'Internal Server Error, could not retrieve album'
			});
		}
	};
