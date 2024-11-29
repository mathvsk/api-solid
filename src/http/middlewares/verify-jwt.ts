import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    // busca o token do cabeçalho da requisição e tambem valida o token
    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({ message: 'Não autorizado' })
  }
}
