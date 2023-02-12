import prisma from '../prisma'
import { CreatePhoto } from '../types'

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
