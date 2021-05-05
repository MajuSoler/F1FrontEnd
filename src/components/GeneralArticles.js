import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'
import Background from './Background'
import Header from './Header'
import Paragraph from './Paragraph'
import Button from './Button'
import apiUrl from '../../config/constants'
import { selectToken } from '../store/user/selectors'
import { selectArticles } from '../store/articles/selectors'
import { fetch_sucess } from '../store/articles/actions'

export default function GeneralArticles({ navigation }) {
  const token = useSelector(selectToken)
  const articles = useSelector(selectArticles)
  console.log('these are the articles', articles)
  console.log('this is the token', token)
  const [state, setState] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token !== null) {
      dispatch(fetch_sucess())
    }
  }, [token])
  return (
    <Background>
      <Header>News!</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={() => fetch_sucess()}>
        sucess
      </Button>
    </Background>
  )
}
