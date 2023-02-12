/**
 * Router Template
 */
import express from 'express'
import {  store  } from '../controllers/album_controller'
const router = express.Router()

/**
 * POST /albums
 */
router.post('/', store)

export default router
