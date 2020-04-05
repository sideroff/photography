import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ isAllowed, ...props }) =>
  isAllowed
    ? <Route {...props} />
    : <Redirect to="/authenticade" />