import prisma from '../prisma'
import { CreateAlbumData, CreatePhoto } from '../types'

import Debug from 'debug'
const debug = Debug('prisma-books:album_service')

	export const getAlbums = (user_id: number) => {

		return prisma.album.findMany({
		where: {
			user_id: user_id
		}
		})
	}


	export const getAlbumById = (albumId: number) =>{

		return prisma.album.findUnique({
			where: {
				id: albumId
			},
			include: {
				photos: true
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



	export const connectPhotosToAlbum = async (albumId: number, photoId: number) => {

		return await prisma.album.update({
			where: {
				id: albumId,
			},
			data: {
				photos: {
					connect: {
						id:  photoId,
					}
				}
			},
			include: {
				photos: true,
			}
		})
		}







	// export const connectPhotosToAlbum = async (albumId: number, photosId: number[]) => {
	// 	return await prisma.album.update({
	// 	  where: {
	// 		id: albumId
	// 	},
	// 	  data: {
	// 		photos: {
	// 		  connect: photosId.map(photoId => ({
	// 			id: photoId
	// 		}))
	// 		}
	// 	  }
	// 	});
	//   };






	// export const connectPhotoToAlbum = async (photoId: number, albumId: number) => {
	// 	return await prisma.album.update({
	// 	  where: {
	// 		id: albumId
	// 	  },
	// 	  data: {
	// 		photos: {
	// 		  connect: [
	// 			{
	// 			  id: photoId
	// 			}
	// 		  ]
	// 		}
	// 	  }
	// 	});
	//   };
