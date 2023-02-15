import prisma from '../prisma'
import { CreateUserData } from '../types'

export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}


//TODO: Change this name to maybe loginByEmail
export const getUserByEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: {
			email: email
		},
	})
}




