import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  try {
    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof MaxDistanceError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof MaxNumberOfCheckInsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
