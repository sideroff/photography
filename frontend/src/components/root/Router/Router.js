import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ProtectedRoute } from '../../molecules'
import { Header } from '../../organisms'
import { Contacts, Home, NotFound, } from '../../pages'

import { StoreContext } from '../../../store'

export default function Router() {

  const test = useContext(StoreContext)

  console.log('test ', test)

  return (
    <BrowserRouter basename='/'>
      <Header />
      <Switch>
        <div className='page'>
          <Route exact path='/' component={Home} />
          <Route path='/contact' component={Contacts} />
          <ProtectedRoute path='/upload' component={Contacts} isAllowed={true} />
          <Route path='*' component={NotFound} />
        </div>
      </Switch>
    </BrowserRouter>
  )
}