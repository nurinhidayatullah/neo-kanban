const { User } = require('../models')
const { compare } = require('../helpers/hashPwd')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

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
            console.log(payload)
            let token = generateToken(payload)
            res.status(200).json({token, email: user.email})
        })
        .catch(err => {
            next(err)
        })
    }

    static googleSignIn (req, res, next) {
        let { id_token } = req.body

        const client = new OAuth2Client(process.env.CLIENT_ID);
        let makeUser;
        client.verifyIdToken({
            idToken:id_token,
            audience:process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            let user = {
                email: payload.email,
                password: '123456789'
            }
            makeUser = user
            return User.findOne({where: {email: user.email}})
        })
        .then(data => {
            if(data){
                return data
            } else {
                return User.create(makeUser)
            }
        })
        .then(data => {
            let token = generateToken({id: data.dataValues.id, email:data.dataValues.email, organization:data.dataValues.organization})
            res.status(200).json({token, email: data.dataValues.email})
        })
        .catch(err => {
            console.log(err)
            next()
        })
    }
}

module.exports = UserControl