import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
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
  TouchableOpacity,
} from 'react-native'

import Header from './Header'
import Background from './Background'
import Paragraph from './Paragraph'
import Button from './Button'

import { selectToken } from '../store/user/selectors'
import { appLoading } from '../store/appState/selectors'
import { selectArticles } from '../store/articles/selectors'
import { fetch_sucess } from '../store/articles/actions'

const ArticleInfo = ({
  title,
  author,
  description,
  urlToImage,
  navigation,
}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{'Title : ' + title}</Text>
    <Text style={styles.title}>{'Author : ' + author}</Text>
    <Text style={styles.title}>{'description : ' + description}</Text>
    <Image
      source={{ uri: urlToImage }}
      style={{ width: '100%', height: 160, marginBottom: 30 }}
    />
    <TouchableOpacity
      onPress={() => navigation.navigate('Friends', { paramKey: { title } })}
    >
      <Text style={styles.link}>Read the full article</Text>
    </TouchableOpacity>
  </View>
)

export default function SpecificArticle({ navigation }) {
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

  return (
    <View style={styles.container}>
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
              keyExtractor={(item, index) => index.toString()}
            />
          </SafeAreaView>
        )}
      </Paragraph>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 50,
    padding: 10,
    alignSelf: 'center',
    width: 400,
    height: 600,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
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
