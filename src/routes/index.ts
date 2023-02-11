import express from "express"
import { registerUser } from '../controllers/user_controller'
import { registerValidationRules } from '../validations/user_validation'

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

router.use('/register', registerValidationRules, registerUser)

export default router
