const router = require('express').Router()
const userRouter = require('./user-router')
const taskRouter = require('./task-router') 

router.use('/', userRouter)
router.use('/tasks', taskRouter)

module.exports = router