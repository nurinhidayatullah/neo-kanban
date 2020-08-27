const { Task, User } = require('../models')

const authorization = (req, res, next) => {
    let id = req.params.id
    Task.findOne({where: {id}, include: [{model: User}]})
        .then(data => {
            if(!data) throw {msg: 'Task not found'}
            else if (data.User.organization == req.userData.organization) next ()
            else throw {msg: 'you\'re not authorize to do this'}
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
}

module.exports = authorization