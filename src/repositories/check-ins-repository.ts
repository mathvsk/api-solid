import { Checkin, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
}
