import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from './actions'

const initialState = {
  token: null,
  name: null,
  email: null,
  scuderia: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token)
      return { ...state, ...action.payload }

    case LOG_OUT:
      AsyncStorage.removeItem('token')
      return initialState

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
