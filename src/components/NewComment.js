import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text } from 'react-native'

import Button from './Button'
import TextInput from './TextInput'

import { fetch_commentsAFterfirst } from '../store/comments/actions'
import { selectUser, selectToken } from '../store/user/selectors'

import { selectArticles } from '../store/articles/selectors'
import { apiUrl } from '../../config/constants'

export default function NewComment({ url, navigation }) {
  const [userID, setUserID] = useState('')
  const [comment, setComment] = useState('')
  const [article, setArticle] = useState('')
  const [articleURL, setFinalURL] = useState('')
  const URL = { url }
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const specificArticle = useSelector(selectArticles)
  const dispatch = useDispatch()

  async function addComment(
    ID,
    specificArticleID,
    specifiComment,
    specificToken,
    specificUrl
  ) {
    await axios.post(`${apiUrl}/insertcomment`, {
      userId: ID,
      articleId: specificArticleID,
      comment: specifiComment,
    })

    dispatch(fetch_commentsAFterfirst(token, specificUrl))
  }
  useEffect(() => {
    if (token !== null) {
      setUserID(user.id)
    }
  }, [token])
  useEffect(() => {
    setArticle(specificArticle)
    setFinalURL(URL.url)
  }, [specificArticle])

  const onSendPressed = () => {
    console.log(
      userID,
      article.articles[0].articleId,
      comment,
      token,
      articleURL
    )
    addComment(
      userID,
      article.articles[0].articleId,
      comment,
      token,
      articleURL
    )
    setComment('')
  }

  return (
    <View>
      <TextInput
        label="Comment"
        returnKeyType="next"
        value={comment}
        onChangeText={(text) => setComment(text)}
        autoCapitalize="none"
      />

      <Button mode="contained" color="red" onPress={onSendPressed}>
        Comment
      </Button>
    </View>
  )
}
