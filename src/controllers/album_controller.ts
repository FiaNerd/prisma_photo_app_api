
	import Debug from 'debug'
	import { Request, Response } from 'express'
	import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
	import {  getAlbums, getAlbumById, createAlbum, updateAlbum, createPhotosToAlbum, disconnectPhotoFromAlbum, deleteAlbum } from '../services/album_service'
	import {  getPhotoById } from '../services/photo_service'

	const debug = Debug('prisma_photo_app_api:album_contoller')

		export const index = async (req: Request, res: Response) => {

			const user_id = req.token ? req.token.user_id : NaN;

			if (!req.token || isNaN(req.token.user_id)) {
			return res.status(401).send({
				status: "fail",
				message: "User is not authenticated"
			});
			}

			try {
			const albums = await getAlbums(user_id);

			return res.status(200).send({
				status: "success",
				data: albums
			});

			} catch (err) {

			return res.status(500).send({
				status: 'error',
				message: 'Sorry, the server is down'
			})
			}
		}


		export const show = async (req: Request, res: Response) => {

			const albumId = Number(req.params.albumId)

			const user_id = req.token ? req.token.user_id : NaN;

			if (!req.token || isNaN(req.token.user_id)) {
			return res.status(401).send({
				status: "fail",
				message: "User is not authenticated"
			});
			}

			try {
			const album = await getAlbumById(albumId);

			if (!album) {
				return res.status(404).send({
				status: "fail",
				message: "Album not found"
				});
			}

			if (album.user_id !== user_id) {
				return res.status(403).send({
				status: "fail",
				message: "Not authorized to access this photo"
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
				message: 'Could not get the photo'
			});
			}
		};



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


		/*
			PATCH /albums/:albumId
		*/
		export const update = async (req: Request, res: Response) => {

			const albumId = Number(req.params.albumId)

			const user_id = req.token ? req.token.user_id : NaN;

			if (!req.token || isNaN(req.token.user_id)) {
			return res.status(401).send({
				status: "fail",
				message: "User is not authenticated"
			});
			}

			const validatedData = matchedData(req)

			try {
				const patchAlbum = await updateAlbum(albumId, validatedData);

				if (patchAlbum.user_id !== user_id) {
					return res.status(401).send({
					status: "fail",
					message: "User is not authorized to update this photo"
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
					message: 'Sorry, the server is down'
				})
			}
		}


		export const addPhotoToAlbum = async (req: Request, res: Response) => {

			const photoIds: number[] = req.body.photo_id
			const albumId = Number(req.params.albumId)

			const user_id = req.token ? req.token.user_id : NaN;

			if (!req.token || isNaN(req.token.user_id)) {
				return res.status(401).send({
				status: "fail",
				message: "User is not authenticated"
				});
			}

			const album = await getAlbumById(albumId);

			if (!album) {
				return res.status(400).send({
					status: "fail",
					message: `There is no album with that id: ${albumId}`
				});
			}

			if (album.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: "User is not authorized to access this album"
				});
			}


			for (const photoId of photoIds) {
				const photo = await getPhotoById(photoId);

				if (!photo) {
					return res.status(404).send({
						status: "fail",
						message: `There is no photo with that id: ${photoId}`
					});
				}

				if (photo.user_id !== user_id) {
					return res.status(401).send({
						status: "fail",
						message: "User is not authorized to access this photo"
					});
				}
			}

			if (photoIds.length === 0) {
				return res.status(200).send({
					status: "fail",
					message: "You have to add a photo"
			 	});
			  }



			try {
				 await createPhotosToAlbum(albumId, photoIds)

				 return res.status(200).send({
					status: "success",
					data: null
			 	});

			} catch (err) {
				debug("Error thrown when adding photo %o to a album %o: %o", updateAlbum)
				return res.status(500).send({
					staus: 'error',
					message: 'Sorry, the server is down'
				})
			}
		}


		export const removePhotoFromAlbum = async (req: Request, res: Response) => {
			const albumId = Number(req.params.albumId);
			const photoId = Number(req.params.photoId);

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
					 message: `Photo with ID ${photoId} not found in album with ID ${albumId}`
				});
			  }

			  const album = await getAlbumById(albumId);

			  if (!album ) {
				return res.status(404).send({
				  status: "fail",
				  message: `Album with ID ${albumId} not
				  found`
			  })
			}

			if (album.user_id !== user_id || photo.user_id !== user_id) {
				return res.status(401).send({
					status: "fail",
					message: "User is not authorized to delet this photo"
				})
			}

			const photoInAlbum = album.photos.find((photo) => photo.id === photoId);

			if (!photoInAlbum) {
			  return res.status(404).send({
				status: "fail",
				message: `Photo with ID ${photoId} not found in album with ID ${albumId}`
			  });
			}

			  await disconnectPhotoFromAlbum(albumId, photoId);

				return res.status(200).send({
					status: "success",
				    message: "Photo removed from album"
				})

			} catch (err) {
				debug("Error thrown when removing photo %o from album %o: %o")
			  return res.status(500).send({
				status: "error",
				message: "Internal Server Error, try again"
			  });
			}
		  };


		  export const destroy = async (req: Request, res: Response) => {

			  const albumId = Number(req.params.albumId);

			  const user_id = req.token ? req.token.user_id : NaN;

			  if (!req.token || isNaN(req.token.user_id)) {
				return res.status(401).send({
				  status: "fail",
				  message: "User is not authenticated"
				})
			  }

		 try {
			  const album = await deleteAlbum(albumId);

			  if (!album) {
				return res.status(404).send({
				  status: "fail",
				  message: `Album with ID ${albumId} not found`
				});
			  }

			  if (album.user_id !== user_id) {
				return res.status(401).send({
				  status: "fail",
				  message: "User is not authorized to delete this album"
				});
			  }

			  res.status(200).send({
				status: "success",
				data: null
			  });

			} catch (err) {
			  return res.status(500).send({
				status: "error",
				message: "Internal Server Error, try again"
			  });
			}
		  };
