import { BookCollection } from './BookCollection'
import { BookSearchCriteria } from './BookSearchCriteria'

export interface BookSearcher {
  findBooks(searchCriteria: BookSearchCriteria): Promise<BookCollection>
}
