export class ResourceNotFoundError extends Error {
  constructor() {
    super('Registro não encontrado.')
  }
}
