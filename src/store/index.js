import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import reducer from './rootReducer'

const enhancer = composeWithDevTools(applyMiddleware(ReduxThunk))

const store = createStore(reducer, enhancer)

export default store
