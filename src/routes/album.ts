/**
 * Router Template
 */
import express from 'express'
import {  index, store  } from '../controllers/album_controller'
const router = express.Router()

/**
 * POST /albums
 */
router.get('/', index)

/**
 * POST /albums
 */
router.post('/', store)

export default router
