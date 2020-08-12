const router = require('express').Router()
const TaskControl = require('../controllers/task-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.post('/', TaskControl.create)
router.get('/', TaskControl.show)
router.put('/:id', authorization, TaskControl.update)
router.delete('/:id', authorization, TaskControl.delete)

module.exports = router