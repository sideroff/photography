import React, { createContext, useReducer } from 'react'
import reducers from './reducers'
import { INIT_STATE } from './actionTypes'


function combineReducers(reducersByName) {
  const reducerNames = Object.keys(reducersByName)

  return (state, action) => {
    console.log('rootReducer called ')
    // go through each reducer and call it,
    // saving the result in the corresponding prop name
    return reducerNames.reduce((accumulator, current) => {
      accumulator[current] = reducersByName[current](state && state[current], action)
      return accumulator
    }, {})
  }
}

const appReducer = combineReducers(reducers)


export const StoreContext = createContext()

export default (props) => {
  const [store, dispatch] = useReducer(appReducer, appReducer(undefined, { type: INIT_STATE }))

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider >
  )
}
