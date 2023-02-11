/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { register  } from '../controllers/user_controller'
const router = express.Router()


/**
 * POST /resource
 */
router.post('/', register)

export default router
