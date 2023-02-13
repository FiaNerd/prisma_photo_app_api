/**
 * Router Template
 */
import express from 'express'
import {  index, show, store, update  } from '../controllers/album_controller'
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

// PATCH /albums/:albumId
router.patch('/:albumId', update)

export default router
