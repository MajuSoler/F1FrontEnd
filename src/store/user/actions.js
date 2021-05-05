import axios from 'axios'
import { apiUrl } from '../../../config/constants'
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  ERROR,
} from '../appState/actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const TOKEN_STILL_VALID = 'TOKEN_STILL_VALID'
export const LOG_OUT = 'LOG_OUT'

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  }
}
const loginError = (error) => ({
  type: ERROR,
  payload: error,
})

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
})

export const logOut = () => {
  return { type: LOG_OUT }
}

export const signUp = (name, email, password, scuderia) => {
  // eslint-disable-next-line consistent-return
  // eslint-disable-next-line consistent-return
  return async (dispatch, getState) => {
    dispatch(appLoading('user'))
    // const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    // input validation

    if (!name)
      return dispatch(
        showMessageWithTimeout('danger', true, 'please enter a name')
      )
    if (!email)
      return dispatch(
        showMessageWithTimeout('danger', true, 'please provide valid email')
      )
    if (!password)
      return dispatch(
        showMessageWithTimeout('danger', true, 'please enter a password')
      )
    if (!scuderia)
      return dispatch(
        showMessageWithTimeout('danger', true, 'please enter a scuderia')
      )
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        email,
        password,
        name,
        scuderia,
      })
      dispatch(loginSuccess(response.data))
      dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(
          showMessageWithTimeout('danger', true, error.response.data.message)
        )
      } else {
        console.log(error.message)
        loginError(error.message)

        // dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading())
    }
  }
}

export const login = (email, password) => async (dispatch, getState) => {
  dispatch(appLoading('user'))
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    })
    console.log('this is the response', response)
    dispatch(loginSuccess(response.data))

    dispatch(appDoneLoading())
  } catch (error) {
    if (error.response) {
      dispatch(
        showMessageWithTimeout('danger', true, error.response.data.message)
      )
    } else {
      console.log('this is the error messafe', error.message)
      dispatch(showMessageWithTimeout('danger', true, error.message))
    }
    dispatch(appDoneLoading())
  }
}

export const getUserWithStoredToken = (token) => {
  return async (dispatch, getState) => {
    // get token from the state

    // if we have no token, stop
    if (!token) return

    dispatch(appLoading('user'))
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // token is still valid
      dispatch(tokenStillValid({ ...response.data, token }))
      dispatch(appDoneLoading())
    } catch (error) {
      console.log('got here')

      if (error.response) {
        console.log(error.response.data.message)
      } else {
        console.log(error)
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut())
      dispatch(appDoneLoading())
    }
  }
}
