import express from "express"
import morgan from "morgan"
import routes from './routes'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

// Use routes
app.use(routes, (req, res) => {
	res.status(404).send({
		status: "fail",
		message: "Route not found, check the adress and try again"
	  })
})

export default app
