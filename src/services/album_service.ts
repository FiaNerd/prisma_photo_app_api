import prisma from '../prisma'
import { CreateAlbumData,  UpdateAlbumData } from '../types'

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

	export const updateAlbum = async (albumId: number, albumUpdate: UpdateAlbumData) => {

		return await prisma.album.update({
			where: {
				id: albumId,
			},
			data: albumUpdate
		})
	}


	export const createPhotosToAlbum = async (albumId: number, photoIds: number[]) => {

		return await prisma.album.update({
		  where: {
			id: albumId,
		  },
		  data: {
			photos: {
			  connect: photoIds.map(id => ({ id })),
			}
		  },
		  include: {
			photos: true,
		  }
		});
	  };

