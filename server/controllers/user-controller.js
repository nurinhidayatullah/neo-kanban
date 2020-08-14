const { User } = require('../models')
const { compare } = require('../helpers/hashPwd')
const { generateToken } = require('../helpers/jwt')

class UserControl {
    static register (req, res, next) {
        let { email, password, organization } = req.body
        User.findOne({
            where: {
                email,
            }
        })
        .then(data => {
            if(data) throw {msg: 'This email has been registered'}
            else return User.create({
                email,
                password,
                organization
            })
        })
        .then(user => {
            res.status(201).json({id: user.id, email: user.email})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static login (req, res, next) {
        let {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user) throw {msg: 'Invalid Email or Password'}
            let comparePwd = compare(password, user.password)
            if(!comparePwd) throw {msg: 'Invalid Email or Password'}
            let payload = {
                id: user.id,
                email: user.email,
                organization: user.organization
            }

            let token = generateToken(payload)
            res.status(200).json({token, email: user.email})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static googleSignIn (req, res, next) {
        
    }
}

module.exports = UserControl