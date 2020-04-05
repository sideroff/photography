import {
  UPDATE_IS_AUTHENTICATED
} from '../actionTypes'

const DEFAULT_STATE = {
  isAuthenticated: false
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload }
    default:
      return state
  }
}
