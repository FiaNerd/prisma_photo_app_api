/**
 * Controller Template
 */
import Debug from 'debug'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')

/**
 * Get all resources
 */
export const index = async (req: Request, res: Response) => {
}

/**
 * Get a single resource
 */
export const show = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	try {

	} catch (err) {
		res.status(500).send({
			staus: 'fail',
			message: 'Could not create a new user'
		})
	}

}

/**
 * Create a resource
 */
export const register = async (req: Request, res: Response) => {

}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
