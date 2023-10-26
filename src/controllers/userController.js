const Admin = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const mongoose = require('mongoose');
// const { default: fastifyBcrypt } = require('fastify-bcrypt');
// const bcrypt = require('fastify-bcrypt');

const getAdmin = async (request, reply) => {
    const { params } = request
    console.log(params)
    // const admin = await Admin.findOne({ username: params.username, isDelete: false })
    const {
        activeSpan,
        tracer,
        // context,
        // extract,
        // inject,
      } = request.openTelemetry()
      if (admin) {
        // Spans started in a wrapped route will automatically be children of the activeSpan.
        const childSpan = tracer.startSpan(`${activeSpan.name} - child process`)
        // doSomeWork()
        childSpan.end()
        reply
            .code(200)
            .send(admin)
    } else {
        reply
            .code(404)
            .send({
                statusCode: 404,
                message: "Admin not found"
            })
    }
}
const getAllAdmin = async (request, reply) => {
    // const admin = await Admin.find({ isDelete: false })
    reply.send(admin)
}

const addAdmin = async (request, reply) => {
    const { body } = request
    body.password = await generatePassword(body.password)
    // const admin = await Admin.create(body)
    reply.send('Admin created')
}

// const removeAdmin = async (request, reply) => {
//     try {
//         const { body } = request;
//         if (body._id) {
//             body._id = new mongoose.Types.ObjectId(body._id);
//         }

//         const response = await Admin.findOneAndUpdate(body, { isDelete: true }, { new: true })
//         if (response && response.isDelete) {
//             reply
//                 .code(200)
//                 .send({
//                     statusCode: 200,
//                     message: "Remove success"
//                 })
//         } else {
//             reply
//                 .code(404)
//                 .send({
//                     statusCode: 404,
//                     message: "Admin not found"
//                 })
//         }
//     } catch (error) {
//         reply
//             .code(500)
//             .send({
//                 statusCode: 500,
//                 message: error.message ? error.message : ''
//             })
//     }
// }

// const adminLogin = async (request, reply) => {
//     const { username, password } = request.body
//     const admin = await Admin.findOne({ username })
//     if (!admin) {
//         throw new Error('Unauthorized')
//     }
//     await comparePasswords(password, admin.password)
//     /* 
//     JWT token return for admin account
//     */
//     const token = jwt.sign({
//         id: admin.id,
//         role: admin.role,
//         name: admin.firstName
//     }, config.config.JWTsecret, {
//         expiresIn: 6400
//     })

//     reply
//         .code(200)
//         .send({
//             "statusCode": 200,
//             "message": "Successful login",
//             "token": token
//         })


// }

const comparePasswords = async (password, existsPassword) => {
    console.log(password)
    console.log(existsPassword)
    const isPasswordCorrect = await bcrypt.compare(password, existsPassword)
    if (!isPasswordCorrect) {
        throw new Error('Autorization failed')
    }
    return true
}

const generatePassword = async (password) => {
    const saltRound = 12
    const salt = await bcrypt.genSalt(saltRound)
    console.log(salt)
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}


module.exports = {
    getAdmin,
    addAdmin,
    // removeAdmin,
    // adminLogin,
    getAllAdmin
}