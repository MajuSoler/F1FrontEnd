import { combineReducers } from 'redux'
import appState from './appState/reducer'
import user from './user/reducer'
import articles from './articles/reducer'
import comments from './comments/reducer'
// import spaceDetails from "./spaceDetails/reducer";

export default combineReducers({
  appState,
  user,
  articles,
  comments,
  //   spaceDetails
})
