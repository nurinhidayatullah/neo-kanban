const { Task } = require('../models')

const authorization = (req, res, next) => {
    let id = req.params.id
    Task.findByPk(id)
        .then(data => {
            if(!data) throw {msg: 'Task not found'}
            else if(data.UserId == req.userData.id) next()
            else throw {msg: 'you\'re not authorize to do this'}
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization