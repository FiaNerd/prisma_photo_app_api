import prisma from '../prisma'
import { CreatePhoto } from '../types'


	export const createPhoto = async (data: CreatePhoto) => {
		return await prisma.photo.create({
		data: {
			title: data.title,
			url: data.url,
			comment: data.comment,
			user: {
			connect: {
				id: Number(data.user_id)
			}
			}
		}
		})
	}

