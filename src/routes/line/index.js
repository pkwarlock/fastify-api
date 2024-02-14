const hook = require('../../hooks/auth');
const loginController = require('../../controllers/loginController');
module.exports = async function (fastify) {
  fastify.route({
    method: 'GET',
    path: '/',
    // preHandler: [hook.verifyToken],
    handler: loginController.HelloWorld,
    schema: {
      tags: ["Authentication"],
      description: 'Hello World',
      response: {
        200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            example: {
              message: 'Success',
            },
        },
        404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            example: {
              message: 'Not Found',
            },
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
    path: '/auth/line',
    // preHandler: [hook.verifyToken],
    handler: loginController.authLine,
    schema: {
      description: 'Initiate LINE login process',
      tags: ['Authentication'],
      response: {
        302: {
            type: 'object',
            properties: {
            redirectUri: { type: 'string' },
            },
        },
        },
    }
  })

  fastify.route({
    method: 'GET',
    path: '/admin/addAdmin',
    handler: loginController.authLineCallback,
    schema: {
        description: 'Callback URL after LINE login',
        tags: ['Authentication'],
        querystring: {
          code: { type: 'string' },
          state: { type: 'string' },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              accessToken: { type: 'string' },
              profile: { type: 'object' },
            },
          },
        },
      }
  })

}