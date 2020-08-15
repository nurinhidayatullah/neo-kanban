const router = require('express').Router()
const TaskControl = require('../controllers/task-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/categories', TaskControl.getCategory)
router.post('/', TaskControl.create)
router.get('/', TaskControl.show)
router.put('/category/:id', TaskControl.updateCategory)
router.delete('/:id', authorization, TaskControl.delete)
router.put('/:id', TaskControl.update)

module.exports = router