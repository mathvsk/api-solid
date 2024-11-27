import { app } from '@/app'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export function appRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
