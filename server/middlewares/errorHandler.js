const errorHandler = (err, req, res, next) => {
    let errors = []
    let statusCode = 500
    switch(err.name) {
        case 'SequelizeValidationError':
            
            for(let element of err.errors) {
                errors.push(element.message)
            }
            statusCode = 400
            res.status(statusCode).json({err: errors})

            break

        default: 
            statusCode = 400
            res.status(statusCode).json({err: err.msg})
            break

        case 'JsonWebTokenError':
            statusCode = 401
            res.status(statusCode).json({err: 'Authentication Failed'})
            break
            
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            res.status(statusCode).json({err: 'Email has been registered'})
    }
}

module.exports = errorHandler