import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import {  getAlbums, getAlbumById, createAlbum, updateAlbum, connectPhotosToAlbum } from '../services/album_service'

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

		const photoId = req.body.photo_id
		const albumId = Number(req.params.albumId)
		// const photosId: number[] = req.body.photo_id

		const user_id = req.token ? req.token.user_id : NaN;

		  if (!req.token || isNaN(req.token.user_id)) {
			return res.status(401).send({
			  status: "fail",
			  message: "User is not authenticated"
			});
		  }


		try {
			const updateAlbum = await connectPhotosToAlbum(albumId, photoId)

			//TODO: SEE if you can make this work if user add a photo to album when the user auth to do it
			if (!updateAlbum) {
				return res.status(404).send({
				status: "fail",
				message: "Photo not found"
				});
			}

			if (updateAlbum.user_id !== user_id) {
				return res.status(401).send({
				status: "fail",
				message: "User is not authorized to update this photo"
				});
			}

			return res.status(200).send({
				status: "success",
				data: null
			});

		} catch (err) {
			return res.status(500).send({
				staus: 'error',
				message: 'Sorry, the server is down'
			})
		}
	}
