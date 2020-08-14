const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
    try {
        let { token } = req.headers
        let decoded = verifyToken(token)
        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
            req.userData = decoded
            console.log(req.userData)
            next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication