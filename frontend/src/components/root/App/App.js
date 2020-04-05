import React from 'react'
import { Router } from '../'

import StoreContextProvider from '../../../store'


import './App.scss'

export default function App() {
  return (
    <StoreContextProvider>
      <Router />
    </StoreContextProvider>

  )
}