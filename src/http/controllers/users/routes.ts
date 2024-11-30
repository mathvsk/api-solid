import { app } from '@/app'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

export function usersRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Rota com autenticação */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
