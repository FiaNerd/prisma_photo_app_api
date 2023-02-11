import prisma from '../prisma'
import { CreatePhoto } from '../types'

export const createPhoto = async (data: CreatePhoto) => {
	return await prisma.photo.create({
		data: data,
	})
}



