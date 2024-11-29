import { app } from '@/app'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'

export function appRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Rota com autenticação */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
