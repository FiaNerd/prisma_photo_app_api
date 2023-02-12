import prisma from '../prisma'
import { CreatePhoto } from '../types'

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
