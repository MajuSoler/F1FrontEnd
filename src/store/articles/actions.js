import axios from 'axios'
import { apiUrl } from '../../../config/constants'
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from '../appState/actions'

export const INFORMATION_SUCCESS = 'INFORMATION_SUCCESS'

const informationSuccess = (articles) => {
  return {
    type: INFORMATION_SUCCESS,
    payload: articles,
  }
}

export const fetch_sucess = (token) => {
  return async (dispatch, getState) => {
    dispatch(appLoading('Articles'))

    try {
      const response = await axios.get(`${apiUrl}/news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const articles = response.data.articles
      dispatch(informationSuccess(articles))

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

// export const login = (email, password) => async (dispatch, getState) => {
//   dispatch(appLoading('user'))
//   try {
//     const response = await axios.post(`${apiUrl}/login`, {
//       email,
//       password,
//     })

//     dispatch(loginSuccess(response.data))

//     dispatch(appDoneLoading())
//   } catch (error) {
//     if (error.response) {
//       dispatch(
//         showMessageWithTimeout('danger', true, error.response.data.message)
//       )
//     } else {
//       console.log('this is the error messafe', error.message)
//       dispatch(showMessageWithTimeout('danger', true, error.message))
//     }
//     dispatch(appDoneLoading())
//   }
// }

// export const getArticles = (token) => {
//   return async (dispatch, getState) => {
//     // get token from the state

//     // if we have no token, stop
//     if (!token) return

//     dispatch(appLoading('user'))
//     try {
//       // if we do have a token,
//       // check wether it is still valid or if it is expired
//       const response = await axios.get(`${apiUrl}/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       await axios.get(
//         `${apiUrl}/news`,

//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       // token is still valid
//       //   dispatch(tokenStillValid({ ...response.data, token }))
//       dispatch(appDoneLoading())
//     } catch (error) {
//       if (error.response) {
//         // console.log(error.response.data.message)
//       } else {
//         // console.log(error)
//       }
//       // if we get a 4xx or 5xx response,
//       // get rid of the token by logging out
//       //   dispatch(logOut())
//       dispatch(appDoneLoading())
//     }
//   }
// }
