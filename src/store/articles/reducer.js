//  import AsyncStorage from '@react-native-async-storage/async-storage'
import { INFORMATION_SUCCESS } from './actions'

const initialState = {
  articles: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INFORMATION_SUCCESS:
      //  AsyncStorage.setItem('articles', action.payload)
      // return { ...state, ...action.payload }
      return {
        ...state,
        articles: action.payload,
      }

    default:
      return state
  }
}
