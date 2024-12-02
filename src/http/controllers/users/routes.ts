import { refresh } from '@/http/controllers/users/refresh'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

export function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* Rota com autenticação */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
