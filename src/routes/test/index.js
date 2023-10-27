const userController = require('../../controllers/userController')
module.exports = async function (fastify) {
  fastify.route({
    method: 'GET',
    path: '/admin/:username',
    
    // preHandler: [hook.verifyToken],
    handler: userController.getAdmin,
    schema: {
      tags: ["v1"],
      description: 'post some data',
      params: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'username'
          }
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            username: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            role: { type: 'string' },
            email: { type: 'string' }
          }
        },
        404: {
          description: 'Admin not found response',
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        },
        500: {
          description: 'Unsuccessful response',
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        },
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        }
      },
      security: [
        {
          "authorization": []
        }
      ]
    }
  })

  fastify.route({
    method: 'GET',
    path: '/admin/getAllAdmin',
    // preHandler: [hook.verifyToken],
    handler: userController.getAllAdmin,
    schema: {
      tags: ["v1"],
      description: 'Get All Admin Services',
      response: {
        200: {
          description: 'Successful response',
          type: 'array',
          items: {
            type: 'object',
            required: ["username", "firstName", "lastName", "email", "role"],
            properties: {
              _id: { type: 'string' },
              username: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              role: { type: 'string' },
              email: { type: 'string' }
            }
          }
        },
        500: {
          description: 'Successful response',
          type: 'object',
          properties: {
            error: { type: 'string' },
            statusCode: { type: 'number' },
            message: { type: 'string' }
          }
        },
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            admin: { type: 'string' },
            message: { type: 'string' }
          }
        }
      },
      // security: [
      //   {
      //     "authorization": []
      //   }
      // ]
    }
  })

  // fastify.route({
  //   method: 'POST',
  //   path: '/admin/addAdmin',
  //   handler: userController.addAdmin,
  //   schema: {
  //     tags: ["v1"],
  //     body: {
  //       type: 'object',
  //       properties: {
  //         username: { type: 'string' },
  //         password: { type: 'string' },
  //         firstName: { type: 'string' },
  //         lastName: { type: 'string' },
  //         image: { type: 'string' },
  //         email: { type: 'string' },
  //         role: { type: 'string' }
  //       }
  //     }
  //   }
  // })

  // fastify.route({
  //   method: 'POST',
  //   path: '/admin/removeAdmin',
  //   handler: userController.removeAdmin,
  //   schema: {
  //     tags: ["v1"],
  //     body: {
  //       type: 'object',
  //       properties: {
  //         _id: { type: 'string' },
  //         username: { type: 'string' },
  //         password: { type: 'string' },
  //         firstName: { type: 'string' },
  //         lastName: { type: 'string' },
  //         image: { type: 'string' },
  //         email: { type: 'string' },
  //         role: { type: 'string' }
  //       }
  //     },
  //     response: {
  //       200: {
  //         description: 'Successful response',
  //         type: 'object',
  //         properties: {
  //           statusCode: { type: 'number' },
  //           message: { type: 'string' }
  //         }
  //       },
  //       default: {
  //         description: 'Default response',
  //         type: 'object',
  //         properties: {
  //           statusCode: { type: 'number' },
  //           message: { type: 'string' }
  //         }
  //       }
  //     }
  //   }
  // })

  // fastify.route({
  //   method: 'POST',
  //   path: '/admin/login',
  //   handler: userController.adminLogin,
  //   schema: {
  //     tags: ["v1"],
  //     body: {
  //       type: 'object',
  //       properties: {
  //         username: { type: 'string' },
  //         password: { type: 'string' }
  //       }
  //     },
  //     response: {
  //       200: {
  //         description: 'Successful response',
  //         type: 'object',
  //         properties: {
  //           statusCode: { type: 'number' },
  //           message: { type: 'string' },
  //           token: { type: 'string' }
  //         }
  //       },
  //       default: {
  //         description: 'Default response',
  //         type: 'object',
  //         properties: {
  //           statusCode: { type: 'number' },
  //           message: { type: 'string' },
  //           token: { type: 'string' }
  //         }
  //       }
  //     }
  //   }
  // })

  fastify.route({
    method: 'POST',
    path: '/order/GetAllOrder',
    // preHandler: [hook.verifyToken],
    handler: function (request, reply) {
      reply.send({ hello: 'world' })
    },
    schema: {
      tags: ["v1"],
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            token: { type: 'string' }
          }
        },
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            token: { type: 'string' }
          }
        }
      }
    }
  })
}