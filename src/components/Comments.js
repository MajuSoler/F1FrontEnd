import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
// import { Navigation } from 'react-native-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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

// import Article from '../screens/Article'

import { selectToken } from '../store/user/selectors'
import { appLoading } from '../store/appState/selectors'
import { selectArticles } from '../store/articles/selectors'
import { fetch_comments } from '../store/comments/actions'
import { selectComments } from '../store/comments/selectors'

export default function GeneralComments(url) {
  const token = useSelector(selectToken)
  const articles = useSelector(selectArticles)
  const comments = useSelector(selectComments)
  const loading = useSelector(appLoading)
  const URL = { url }

  const [commentsSelected, setCommentsSelected] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (token !== null) {
      dispatch(fetch_comments(token, URL))
    }
  }, [token])

  useEffect(() => {
    setCommentsSelected(comments.comments)
  }, [comments])
  console.log(commentsSelected, 'I really love')
  const renderItem = ({ item }) => <CommentInfo comment={item.comment} />
  const CommentInfo = ({ comment }) => (
    <View style={styles.item}>
      {/* <Text style={styles.author}>The author{author}</Text> */}
      <Text style={styles.text}>The comment{comment}</Text>
    </View>
  )

  return (
    <View>
      <Text>I was correctly called</Text>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <FlatList
          data={commentsSelected}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
      {/* <Header>News!</Header>
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
      </Paragraph> */}
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
    height: 100,
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
  author: {
    fontSize: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    alignItems: 'center',
    marginBottom: 10,
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
