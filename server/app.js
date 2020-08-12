require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, () => console.log(`listening at port: ${port}`))