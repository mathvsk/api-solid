import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // busca o token do cabeçalho da requisição e tambem valida o token
  await request.jwtVerify()

  console.log(request.user.sub)

  return reply.status(200).send()
}
