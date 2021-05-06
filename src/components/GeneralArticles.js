import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, View, ActivityIndicator } from 'react-native'

import Background from './Background'
import Header from './Header'
import Paragraph from './Paragraph'
import Button from './Button'

import { selectToken } from '../store/user/selectors'
import { appLoading } from '../store/appState/selectors'
import { selectArticles } from '../store/articles/selectors'
import { fetch_sucess } from '../store/articles/actions'
import PreviewOfArticle from './PreviewOfArticle'

export default function GeneralArticles({ navigation }) {
  const token = useSelector(selectToken)
  const articles = useSelector(selectArticles)
  const loading = useSelector(appLoading)

  const [articlesSelected, setArticlesSelected] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (token !== null || loading === false) {
      dispatch(fetch_sucess(token))
    }
  }, [token])

  useEffect(() => {
    setArticlesSelected(articles)
  }, [articles])

  return (
    <Background>
      <Header>News!</Header>
      <Paragraph>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#c1262c"
            style={{ marginBottom: 30 }}
          />
        ) : (
          <ScrollView>
            {articlesSelected.articles.map((article, index) => (
              <PreviewOfArticle
                key={index}
                title={article.title}
                author={article.author}
                url={article.urlToImage}
              />
            ))}
          </ScrollView>
        )}
      </Paragraph>

      {/* <Button mode="outlined" onPress={() => fetch_sucess()}>
        sucess
      </Button> */}
    </Background>
  )
}
