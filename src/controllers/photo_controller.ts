/**
 * Controller Template
 */
import Debug from 'debug'
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
	try {

	} catch (err) {
		return res.status(500).send({
			staus: 'error',
			message: 'Could not create a new user'
		})
	}
}

/**
 * Create a resource
 */
export const store = async (req: Request, res: Response) => {

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
