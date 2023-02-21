import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'
import Debug from 'debug'

const debug = Debug('prisma_photo_app_api:album_contoller')

	export const getPhotos = (user_id: number) => {
		return prisma.photo.findMany({
		where: {
			user_id: user_id
		}
		})
	}


	export const getPhotoById = async (photoId: number) => {
		// try {

			return await prisma.photo.findUnique({
				where: {
				id: photoId
				},
			})
		// } catch (error) {
		// 	debug("Error thrown when removing photo %o from album %o: %o")
		// }
	}


	export const createPhoto = async (data: CreatePhotoData) => {

		const { title, url, comment, user_id } = data;

		return await prisma.photo.create({
			data: {
			title,
			url,
			comment,
			user: {
				connect:
				{
					id: Number(user_id)
				}}
			}
		});
	};


	export const updatePhoto = async (photoId: number, photoUpdate: UpdatePhotoData) => {
		try {
		return await prisma.photo.update({
			where: {
			id: photoId
			},
			data: photoUpdate
		});
		} catch (error) {
		console.error(error);
		throw error;
		}
	};


	export const deletePhoto = async (photoId: number) => {
		return await prisma.photo.delete({
		  where: {
			id: photoId
		  }
		})
	  }

