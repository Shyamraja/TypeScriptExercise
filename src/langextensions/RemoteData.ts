export interface NotAsked {
  readonly type: 'NotAsked'
}

export interface Loading {
  readonly type: 'Loading'
}

export interface Failure {
  readonly type: 'Failure'
  readonly error: Error
}

export interface Success<Value> {
  readonly type: 'Success'
  readonly value: Value
}

export function notAsked(): NotAsked {
  return { type: 'NotAsked' }
}

export function loading(): Loading {
  return { type: 'Loading' }
}

export function failure(error: Error): Failure {
  return { type: 'Failure', error }
}

export function success<Value>(value: Value): Success<Value> {
  return { type: 'Success', value }
}

export function isLoading<Value>(x: RemoteData<Value>): boolean {
  return x.type === 'Loading'
}

export type RemoteData<Value> = NotAsked | Loading | Failure | Success<Value>
