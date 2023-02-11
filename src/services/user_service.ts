import prisma from '../prisma'
import { CreateUserData } from '../types'

export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}

export const getUserByEmail = async (email: string) => {
	return prisma.user.findUniqueOrThrow({
		where: {
			email: email
		},
	})
}


