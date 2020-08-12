const router = require('express').Router()
const UserControl = require('../controllers/user-controller')

router.post('/register', UserControl.register)
router.post('/login', UserControl.login)

module.exports = router