import prisma from '../prisma'
import { CreateUserData } from '../types'

export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}


