import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import {
  Header
} from 'components/organisms'

import {
  Contacts,
  Home
} from 'components/pages'

export default function App() {
  return (
    <BrowserRouter basename='/'>
      <Header />
      <Switch>
        <div className='page'>
          <Route exact path='/' component={Home} />
          <Route path='/contact' component={Contacts} />
        </div>
      </Switch>
    </BrowserRouter>
  )
}