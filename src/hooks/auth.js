const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.verifyToken = async (request, reply ,done) => {
    const { authorization } = request.headers
    if (!authorization) {
        throw new Error('Missing authorization header')
    }
    const token = authorization.split(' ')[1]
    jwt.verify(token, config.JWTsecret)
    done()
}