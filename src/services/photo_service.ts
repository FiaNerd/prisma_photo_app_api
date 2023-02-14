import prisma from '../prisma'
import { CreatePhoto, UpdatePhotoData } from '../types'

	export const getPhotos = (user_id: number) => {
		return prisma.photo.findMany({
		where: {
			user_id: user_id
		}
		})
	}


	export const getPhotoById = async (photoId: number) => {
		return await prisma.photo.findUnique({
			where: {
			id: photoId
			},
		})
	}


	export const createPhoto = async (data: CreatePhoto) => {
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

