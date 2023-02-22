import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'
import Debug from 'debug'

const debug = Debug('prisma_photo_app_api:photo_controller')

	export const getPhotos = (user_id: number) => {
		return prisma.photo.findMany({
			where: {
				user_id: user_id
			},
		})
	}


	export const getPhotoById = async (photoId: number) => {
		return await prisma.photo.findUnique({
			where: {
				id: photoId
			},
		})
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
					id: user_id
				}}
			}
		});
	};


	export const updatePhoto = async (photoId: number, photoUpdate: UpdatePhotoData) => {

			return await prisma.photo.update({
				where: {
				id: photoId
				},
				data: photoUpdate
			});
	}


	export const deletePhoto = async (photoId: number) => {
		return await prisma.photo.delete({
		  where: {
			id: photoId
		  }
		})
	}

