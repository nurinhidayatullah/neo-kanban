require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routers/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`listening at port: ${port}`))