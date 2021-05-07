import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native'

import Background from './Background'
import Header from './Header'
import Paragraph from './Paragraph'
import Button from './Button'

import { selectToken } from '../store/user/selectors'
import { appLoading } from '../store/appState/selectors'
import { selectArticles } from '../store/articles/selectors'
import { fetch_sucess } from '../store/articles/actions'

const ArticleInfo = ({ title, author, description, urlToImage }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{'Title : ' + title}</Text>
    <Text style={styles.title}>{'Author : ' + author}</Text>
    <Text style={styles.title}>{'description : ' + description}</Text>
    <Image
      source={urlToImage}
      style={{ width: '100%', height: 160, marginBottom: 30 }}
    />
  </View>
)

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
    setArticlesSelected(articles.articles)
  }, [articles])
  const renderItem = ({ item }) => (
    <ArticleInfo
      title={item.title}
      author={item.author}
      description={item.description}
      urlToImage={item.urlToImage}
    />
  )
  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

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
          <SafeAreaView style={styles.container}>
            <FlatList
              data={articlesSelected}
              renderItem={renderItem}
              keyExtractor={(item) => item.index}
            />
          </SafeAreaView>
        )}
      </Paragraph>

      {/* <Button mode="outlined" onPress={() => fetch_sucess()}>
        sucess
      </Button> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'plum',
    paddingTop: 2,
  },
})
