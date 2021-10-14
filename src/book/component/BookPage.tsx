import * as RemoteData from 'langextensions/RemoteData'

import { BookCollection } from 'book/model/BookCollection'
import BookList from './BookList'
import BookSearchControl from './BookSearchControl'
import { BookSearchCriteria } from 'book/model/BookSearchCriteria'
import { BookSearcher } from 'book/model/BookSearcher'
import React from 'react'

interface BookPageProps {
  readonly bookSearcher: BookSearcher
}

const BookPage: React.FunctionComponent<BookPageProps> = ({
  bookSearcher,
}: BookPageProps) => {
  const [bookCollection, setBookCollection] = React.useState<
    RemoteData.RemoteData<BookCollection>
  >(RemoteData.notAsked())
  const [bookTitle, setBookTitle] = React.useState<string>('')
  const [searchItems, setSearchItems] = React.useState<string>('')
  const [searchType, setSearchType] = React.useState<string>('AllFields')
  const [searchCriteria, setSearchCriteria] = React.useState<
    BookSearchCriteria | undefined
  >(undefined)

  React.useEffect(() => {
    if (searchCriteria === undefined) {
      return
    }
    setBookCollection(RemoteData.loading())
    // title (optional) cleanIsbn (optional), edition (optional), year (optional)
    bookSearcher
      .findBooks(searchCriteria)
      .then((books: BookCollection) => {
        setBookCollection(RemoteData.success(books))
      })
      .catch(error => {
        setBookCollection(RemoteData.failure(error))
      })
  }, [searchCriteria, bookSearcher])

  return (
    <div className="flex flex-col px-4 py-4">
      <BookSearchControl
        bookTitle={bookTitle}
        onBookTitleChange={setBookTitle}
        onSearchSubmit={() => setSearchCriteria({ title: bookTitle, searchType: searchType, searchItems: searchItems })}
        searching={RemoteData.isLoading(bookCollection)}
        onSearchTypeChange = {setSearchType}
        searchType = {searchType} 
        onSearchItemsChange = {setSearchItems}
        searchItems = {searchItems}
      />
      <hr className="my-5" />
      <BookList bookCollection={bookCollection} />
    </div>
  )
}

export default BookPage
