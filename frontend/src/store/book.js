import React, { createContext, useState } from 'react'


export const BookContext = createContext()


const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    { test: 123 },
    { test2: 1234 },
  ])

  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider >
  )
}

export default BookContextProvider