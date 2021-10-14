import { Book } from 'book/model/Book'
import React from 'react'

interface BookListItemProps {
  readonly book: Book
  readonly className?: string
}

const BookListItem: React.FunctionComponent<BookListItemProps> = ({
  book,
  className,
}: BookListItemProps) => (
  <div
    className={['flex', 'p-6', className]
      .filter(x => x !== undefined)
      .join(' ')}
  >
    <span className="flex-1 font-medium">{book.title}</span>
    <span className="flex-1 font-normal ml-5">{book.year}</span>
    <span className="flex-1">{book.isbn}</span>
  </div>
)

export default BookListItem
