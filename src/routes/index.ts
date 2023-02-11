import { registerValidationRules } from '../validations/user_validation'
import express from "express"
import { registerUser, loginUser } from '../controllers/user_controller'
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
router.use('/login', validateToken, loginUser)

export default router
