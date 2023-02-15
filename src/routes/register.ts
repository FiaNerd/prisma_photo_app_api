/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { registerUser  } from '../controllers/auth_controller'

const router = express.Router()


/**
 * POST /resource
 */
router.post('/', registerUser)

export default router
