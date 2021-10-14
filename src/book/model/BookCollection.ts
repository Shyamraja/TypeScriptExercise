import { Book } from './Book'

export interface BookCollection {
  readonly resultCount: number
  readonly books: readonly Book[]
  readonly page: number
}
