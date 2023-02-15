import express from "express"
import { registerValidationRules } from '../validations/user_validation'
import { photoValidationRules } from '../validations/photo_validation'
import { albumValidationRules } from '../validations/album_validation'
import { registerUser, loginUser } from '../controllers/user_controller'
import photos from './photo'
import albums from './album'
import { validateToken } from '../middlewares/auth/jwt'


// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/*
	POST /register
*/
router.use('/register', registerValidationRules, registerUser)

/*
	POST /login
*/
router.use('/login', loginUser)


// router.use(validateToken)
/*
	POST /photos
*/
router.use('/photos', photoValidationRules, validateToken, photos)

/*
	POST /albums
*/
router.use('/albums', albumValidationRules, validateToken,albums)

export default router
