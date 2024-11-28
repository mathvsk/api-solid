export class MaxDistanceError extends Error {
  constructor() {
    super('A distância máxima permitida foi excedida.')
  }
}
