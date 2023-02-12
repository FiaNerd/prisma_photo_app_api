import prisma from '../prisma'
import { CreateAlbumData } from '../types'


export const getAlbums = (user_id: number) => {
	return prisma.album.findMany({
	  where: {
		user_id: user_id
	  }
	})
  }


export const createAlbum = async (data: CreateAlbumData) => {
	const { title, user_id } = data;

	return await prisma.album.create({
		data: {
		  title,
		  user: {
			connect:
			{
				id: Number(user_id)
			}}
		}
	});
  };

