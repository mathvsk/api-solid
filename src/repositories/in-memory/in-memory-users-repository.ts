import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const emailAlreadyExists = this.users.find((user) => user.email === email)

    if (!emailAlreadyExists) {
      return null
    }

    return emailAlreadyExists
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
