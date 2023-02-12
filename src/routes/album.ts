/**
 * Router Template
 */
import express from 'express'
import {  index, show, store  } from '../controllers/album_controller'
const router = express.Router()

/**
   GET /albums
 */
router.get('/', index)

/**
   GET /albums/:albumId
 */
router.get('/:albumId', show)

/**
   POST /albums
 */
router.post('/', store)

export default router
