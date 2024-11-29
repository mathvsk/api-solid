import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsCaseRequest): Promise<FetchNearbyGymsCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
