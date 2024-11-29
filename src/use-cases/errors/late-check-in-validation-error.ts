export class LateCheckInValidationError extends Error {
  constructor() {
    super('O check-in só pode ser validado até 20 minutos após sua criação.')
  }
}
