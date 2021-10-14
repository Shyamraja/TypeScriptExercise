import React, {useState} from 'react'

interface BookSearchControlProps {
  readonly bookTitle: string,
  readonly searchType: string,
  readonly searchItems: string,
  readonly onSearchTypeChange: (searchType: string) => void
  readonly onSearchItemsChange: (searchItems: string) => void
  readonly onBookTitleChange: (bookTitle: string) => void
  readonly onSearchSubmit: () => void
  readonly searching: boolean
}

const BookSearchControl: React.FunctionComponent<BookSearchControlProps> = ({
  bookTitle,
  onBookTitleChange,
  onSearchTypeChange,
  onSearchItemsChange,
  onSearchSubmit,
  searching,
  searchType,
  searchItems,
}: BookSearchControlProps) =>(
    <div className="flex flex-col">
      <h2 className="text-3xl">Hae kirjoja </h2>
      <div className="font-light text-sm">Kirjan nimi</div>
      <form
        className="flex flex-row max-w-sm"
        onSubmit={event => {
          event.preventDefault()
          onSearchSubmit()
        }}
      >
        <input
          className="flex-1 py-2 px-2 leading-tight text-lg focus:outline-none bg-gray-100 text-black"
          type="text"
          value={bookTitle}
          onChange={event => onBookTitleChange(event.target.value)}
        />
        <select  value={searchType} onChange={event => onSearchTypeChange((event.target.value))}>
          <option value="AllFields">AllFields</option>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Subject">Subject</option>
      </select>

      <input value={searchItems} type="number" onChange={event => onSearchItemsChange((event.target.value))}></input>  

        <button
          className="text-white font-bold px-8 py-2 bg-gray-700 hover:bg-gray-800 ml-2 focus:outline-none disabled:opacity-50"
          type="submit"
          disabled={searching}
        >
          Hae
        </button>
      </form>
    </div>
  )

export default BookSearchControl
