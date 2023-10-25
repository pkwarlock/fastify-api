module.exports = async function (fastify) {
  fastify.route({
    method: 'GET',
    path: '/admin/:username',
    // preHandler: [hook.verifyToken],
    handler: function (request, reply) {
      var { username } = request.params
      console.log(request.params)
      // reply.send({ "hello": username })
      reply
      .code(200)
      .send({
          "statusCode": 200,
          "message": "Successful login",
          "username": username
      })
    },
    schema: {
      tags: ["v2"],
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
      // security: [
      //   {
      //     "authorization": []
      //   }
      // ]
    }
  })

  fastify.route({
    method: 'GET',
    path: '/admin/getAllAdmin',
    // preHandler: [hook.verifyToken],
    handler: function (request, reply) {
      reply.send({ hello: 'world' })
    },
    schema: {
      tags: ["v2"],
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
    //   security: [
    //     {
    //       "authorization": []
    //     }
    //   ]
    }
  })

  fastify.route({
    method: 'POST',
    path: '/admin/addAdmin',
    handler: function (request, reply) {
      reply.send({ hello: 'world' })
    },
    schema: {
      tags: ["v2"],
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          image: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' }
        }
      }
    }
  })

  fastify.route({
    method: 'POST',
    path: '/admin/removeAdmin',
    handler: function (request, reply) {
      reply.send({ hello: 'world' })
    },
    schema: {
      tags: ["v2"],
      body: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          password: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          image: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Successful response',
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
      }
    }
  })

  fastify.route({
    method: 'POST',
    path: '/admin/login',
    handler: function (request, reply) {
      reply.send({ hello: 'world' })
    },
    schema: {
      tags: ["v2"],
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
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

  fastify.route({
    method: 'POST',
    path: '/order/GetAllOrder',
    // preHandler: [hook.verifyToken],
    handler: function (request, reply) {
      reply.send({ hello: 'world' })
    },
    schema: {
      tags: ["v2"],
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