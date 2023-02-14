import express from 'express'
import { index, show, store, update, destroy } from '../controllers/photo_controller'


const router = express.Router()

/**
 * GET /photos
 */
router.get('/', index)

/**
 * GET /photos/:photoId
 */
router.get('/:photoId', show)

/**
 * POST /photos
 */
router.post('/', store)

/**
 * PATCH /photos/:photoId
 */
router.patch('/:photoId', update)
// router.patch('/:photoId', [], update)

/**
 * DELETE /photos/:photoId
 */
router.delete('/:photoId', destroy)

export default router
