require("dotenv").config()
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const router = require("./api/college/router")

app.use(express.json())

app.use("/api/v1/college", router)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on PORT :", process.env.APP_PORT)
})