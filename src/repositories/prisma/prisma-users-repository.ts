import { prisma } from "@/lib/prisma";
import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepository{
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}