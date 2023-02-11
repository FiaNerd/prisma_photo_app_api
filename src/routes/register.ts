/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { registerUser  } from '../controllers/user_controller'

const router = express.Router()


/**
 * POST /resource
 */
router.post('/', registerUser)

export default router
