import express from 'express'

import {  index, show, store, update, addPhotoToAlbum, removePhotoFromAlbum, destroy  } from '../controllers/album_controller'

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

/*
	PATCH /albums/:albumId
*/
router.patch('/:albumId', update)


/*
	POSTS /albums/:albumId/photos
*/
router.post('/:albumId/photos', addPhotoToAlbum)

/*
	DELETE /albums/:albumId/photos/:photoId
*/
router.delete('/:albumId/photos/:photoId',removePhotoFromAlbum )

/*
	DELETE /albums/:albumId
*/
router.delete('/:albumId', destroy)

export default router
