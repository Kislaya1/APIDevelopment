require("dotenv").config()
const express = require('express')
const app = express()
const router = require("./api/college/router")

app.use(express.json())

app.use("/api/v1/college", router)

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on PORT :", process.env.APP_PORT)
})