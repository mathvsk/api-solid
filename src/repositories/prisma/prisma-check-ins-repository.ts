import { prisma } from '@/lib/prisma'
import { Checkin, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findById(id: string): Promise<Checkin | null> {
    const checkIn = await prisma.checkin.findUnique({ where: { id } })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const checkIns = prisma.checkin.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  countByUserId(userId: string): Promise<number> {
    const count = prisma.checkin.count({ where: { user_id: userId } })

    return count
  }

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({ data })

    return checkIn
  }

  async save(data: Checkin): Promise<Checkin> {
    const checkInUpdated = await prisma.checkin.update({
      where: { id: data.id },
      data,
    })

    return checkInUpdated
  }
}
