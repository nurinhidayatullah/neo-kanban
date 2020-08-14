const router = require('express').Router()
const TaskControl = require('../controllers/task-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/categories', TaskControl.getCategory)
router.post('/', TaskControl.create)
router.get('/', TaskControl.show)
router.delete('/:id', authorization, TaskControl.delete)
router.put('/:id', authorization, TaskControl.update)

module.exports = router