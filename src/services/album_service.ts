import Debug from 'debug'
import prisma from '../prisma'
import { CreateAlbumData,  UpdateAlbumData } from '../types'


const debug = Debug('prisma-books:album_service')


	// /albums
	export const getAlbums = (user_id: number) => {

		return prisma.album.findMany({
		where: {
			user_id: user_id
			}
		})
	}


	// /albums/:albumId
	export const getAlbumById = (albumId: number) =>{

		try {
			return prisma.album.findUnique({
				where: {
					id: albumId
				},
				include: {
					photos: true
				}
			})
		} catch (err) {
			console.log("Can't fin id",err)
			debug("Error thrown when removing photo %o from album %o: %o")
		}
	}

	// /albums
	export const createAlbum = async (data: CreateAlbumData) => {

		const { title, user_id } = data;

		return await prisma.album.create({
			data: {
			title,
			user: {
				connect:
				{
					id: user_id
				}}
			}
		});
	};


	// /albums/:albumId
	export const updateAlbum = async (albumId: number, albumUpdate: UpdateAlbumData) => {

		return await prisma.album.update({
			where: {
				id: albumId,
			},
			data: albumUpdate
		})
	}


	//Create /albums/:albumId/photos
	export const createPhotosToAlbum = async (albumId: number, photoIds: number[]) => {

		const album = await prisma.album.update({
		  where: {
			id: albumId,
		  },
		  data: {
			photos: {
			  connect: photoIds.map(id => ({ id })),
			},
		  },
		  include: {
			photos: true,
		  },
		});

		return album;
	  };


	//Remove /albums/:albumId/photos/:photoId
	export const disconnectPhotoFromAlbum = async (albumId: number, photoId: number) => {
		try {

			return await prisma.album.update({
			where: {
				id: Number(albumId),
			},
			data: {
				photos: {
				disconnect: {
					id: Number(photoId),
				  }
				},
			  },
			})
		} catch (err) {
			debug("Error thrown when removing photo %o from album %o: %o", albumId, photoId, err)
		}
  	}


	  export const deleteAlbum = async (albumId: number) => {

		const album = await prisma.album.findUnique({
		  where: {
			id: albumId
		  },
		  include: {
			photos: true
		  },
		});

		const photoIds = album?.photos?.map(photo => photo.id) || [];

		const photo = photoIds.map(id => ({ id }));

		await prisma.album.update({
			where: {
				id: albumId
				},
			data: {
				photos: {
				disconnect: photo
				}
		 	},
		});

		await prisma.album.delete({
		  where: {
			id: albumId
		  }
		});

		return album;
	}
