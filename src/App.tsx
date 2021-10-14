import BookPage from 'book/component/BookPage'
import { FinnaLibraryClient } from 'infrastructure/FinnaLibraryClient'
import React from 'react'

const finnaLibraryClient = new FinnaLibraryClient()

const App: React.FC = () => {
  return <BookPage bookSearcher={finnaLibraryClient} />
}
export default App
