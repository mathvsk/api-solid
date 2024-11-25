import { app } from '@/app'
import { register } from './controllers/register'

export function appRoutes() {
  app.post('/users', register)
}
