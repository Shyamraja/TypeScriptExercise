import { Book } from 'book/model/Book'
import { BookCollection } from 'book/model/BookCollection'
import { BookSearchCriteria } from 'book/model/BookSearchCriteria'
import { BookSearcher } from 'book/model/BookSearcher'
import { convertToObject } from 'typescript'

interface FinnaClientSearchRecord {
  readonly title: string
  readonly cleanIsbn?: string
  readonly year?: string
}

interface FinnaClientSearchResponse {
  readonly resultCount: number
  readonly records: readonly FinnaClientSearchRecord[]
}

function toBook(searchRecord: FinnaClientSearchRecord): Book {
  return {
    title: searchRecord.title,
    isbn: searchRecord.cleanIsbn,
    year: searchRecord.year,
  }
}

// HELMET-KIRJASTOJEN AINEISTOLUETTELOT
// Swagger API documentation:
// https://api.finna.fi/swagger-ui/?url=%2Fapi%2Fv1%3Fswagger#!
export class FinnaLibraryClient implements BookSearcher {
  findBooks({ title, searchType, searchItems}: BookSearchCriteria, type?: string): Promise<BookCollection> {
    if (parseInt(searchItems)<0 ) {
      searchItems="0";
    }
    const page = 1
    const queryParams = [
      ['lookfor', title],
      ['type', `${searchType}`],
      ['field[]', 'title'],
      ['field[]', 'cleanIsbn'],
      ['field[]', 'author'],
      ['field[]', 'year'],
      ['sort', 'relevance,id asc'],
      ['page', `${page}`],
      ['limit', `${searchItems}`],
      ['prettyPrint', 'false'],
      ['lng', 'fi'],
    ]

    const queryString = queryParams
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return fetch(`https://api.finna.fi/api/v1/search?${queryString}`, {
      headers: { Accept: 'application/json' },
    })
      .then(response => response.json())
      .then((booksResponse: FinnaClientSearchResponse) => {
        return {
          resultCount: booksResponse.resultCount,
          books:
            booksResponse.resultCount === 0
              ? []
              : booksResponse.records.map(toBook),
          page,
        }
      })
  }
}
