import axios from 'axios'
import { apiUrl } from '../../../config/constants'
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from '../appState/actions'

export const INFORMATION_SUCCESS = 'INFORMATION_SUCCESS'

const informationSuccess = (comments) => {
  return {
    type: INFORMATION_SUCCESS,
    payload: comments,
  }
}

export const fetch_comments = (token, articleURL) => {
  console.log(articleURL.url, ' i am the backend')
  const ArticleURL = encodeURIComponent(`${articleURL.url}`)
  console.log('I am supposed to be in the front and encoded', ArticleURL)
  return async (dispatch, getState) => {
    dispatch(appLoading('Comments'))

    try {
      const response = await axios.get(
        `${apiUrl}/allcommentsbtarticle/${ArticleURL}`
      )

      console.log(response.data.resposta.rows[0].comments, ' I am the response')
      dispatch(informationSuccess(response.data.resposta.rows[0].comments))

      dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(
          showMessageWithTimeout('danger', true, error.response.data.message)
        )
      } else {
        console.log(error.message)
      }
      dispatch(appDoneLoading())
    }
  }
}

export const fetch_commentsAFterfirst = (token, articleURL) => {
  const ArticleURL = encodeURIComponent(`${articleURL}`)

  return async (dispatch, getState) => {
    dispatch(appLoading('Comments'))

    try {
      const response = await axios.get(
        `${apiUrl}/allcommentsbtarticle/${ArticleURL}`
      )

      dispatch(informationSuccess(response.data.resposta.rows[0].comments))

      dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(
          showMessageWithTimeout('danger', true, error.response.data.message)
        )
      } else {
        console.log(error.message)
      }
      dispatch(appDoneLoading())
    }
  }
}
