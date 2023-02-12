import prisma from '../prisma'
import { CreatePhoto } from '../types'


	export const createPhoto = async (data: CreatePhoto,) => {

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				id: Number(data.user_id),
			}
		});

		const userId = Number(data.user_id)
		return await prisma.photo.create({
		data: {
			title: data.title,
			url: data.url,
			comment: data.comment,
			user: {
			connect: {
				id: Number(userId)
			}
			}
		}
		})
	}

