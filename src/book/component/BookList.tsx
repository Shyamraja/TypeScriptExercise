import { BookCollection } from 'book/model/BookCollection'
import BookListHeader from './BookListHeader'
import BookListItem from './BookListItem'
import React from 'react'
import { RemoteData } from 'langextensions/RemoteData'
import { assertNever } from 'langextensions/assertNever'

interface BookListProps {
  readonly bookCollection: RemoteData<BookCollection>
}

function bookListItemClass(index: number): string {
  return index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
}

const BookList: React.FunctionComponent<BookListProps> = ({
  bookCollection,
}: BookListProps) => {
  switch (bookCollection.type) {
    case 'NotAsked':
      return <div>Voit hakea kirjoja ylläolevasta hakupaneelista.</div>
    case 'Loading':
      return <div>Ladataan kirjoja...</div>
    case 'Failure':
      return <div>Hups! Haku epäonnistui.</div>
    case 'Success':
      return (
        <React.Fragment>
          <BookListHeader bookCollection={bookCollection.value} />
          <div className="flex flex-col">
            {bookCollection.value.books.map((book, index) => (
              <BookListItem
                key={`${book.title}${book.year}${book.isbn}`}
                book={book}
                className={bookListItemClass(index)}
              />
            ))}
          </div>
        </React.Fragment>
      )
    default:
      assertNever(bookCollection)
  }
}

export default BookList
