import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { NavigationContainer } from '@react-navigation/native'
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
  TouchableOpacity,
} from 'react-native'

import { apiUrl } from '../../config/constants'
import GeneralComments from '../components/Comments'
import BackButton from '../components/BackButton'
import NewComment from '../components/NewComment'
import { selectComments } from '../store/comments/selectors'

// import { newArticle } from '../store/articles/actions'
import { selectToken } from '../store/user/selectors'

export default function Articles({ route, navigation }) {
  const comments = useSelector(selectComments)
  // const token = useSelector(selectToken)
  // const URLNeeded = encodeURIComponent(route.params.paramKey.url)
  // const dispatch = useDispatch()
  const [savedOnTheDB, setSavedOnTheDB] = useState('')
  const title = route.params.paramKey.title
  const url = route.params.paramKey.url
  const description = route.params.paramKey.description
  const author = route.params.paramKey.author
  // const content = route.params.paramKey.content
  // const img_url = route.params.paramKey.urlToImage
  const encodedtitle = encodeURIComponent(route.params.paramKey.title)
  const encodedurl = encodeURIComponent(route.params.paramKey.url)
  const encodeddescription = encodeURIComponent(
    route.params.paramKey.description
  )
  const encodedauthor = encodeURIComponent(route.params.paramKey.author)
  const encodedcontent = encodeURIComponent(route.params.paramKey.content)
  const encodedimg_url = encodeURIComponent(route.params.paramKey.urlToImage)

  async function researchArticle(readyURL) {
    const articleURL = encodeURIComponent(readyURL)

    const response = await axios.get(`${apiUrl}/specificarticle/${articleURL}`)
    setSavedOnTheDB(response.data.saved)
  }

  useEffect(() => {
    researchArticle(url)
  }, [])

  async function addArticle(
    titleReady,
    urlReady,
    descriptionReady,
    authorReady,
    contentReady,
    img_urlReady
  ) {
    await axios.post(`${apiUrl}/insertarticle`, {
      titleReady,
      urlReady,
      descriptionReady,
      authorReady,
      contentReady,
      img_urlReady,
    })
  }

  useEffect(() => {
    researchArticle(url)
  }, [comments])

  useEffect(() => {
    if (savedOnTheDB === false) {
      addArticle(
        encodedtitle,
        encodedurl,
        encodeddescription,
        encodedauthor,
        encodedcontent,
        encodedimg_url
      )
    }
  }, [savedOnTheDB])

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />

      {savedOnTheDB ? (
        <View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.text}>{description}</Text>
          </View>

          <View>
            <GeneralComments url={url} />
          </View>

          <View>
            <NewComment url={url} />
          </View>
        </View>
      ) : (
        <View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.text}>{description}</Text>
          </View>
          <View>
            <Text style={styles.title}>Be the first to comment</Text>
          </View>
          <View>
            <NewComment />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',

    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 30,
    padding: 15,

    width: '100%',
    height: '90%',
  },
  containerArticle: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 30,
    padding: 15,
    alignSelf: 'center',
    // flex: 3,
    width: '100%',
    height: '40%',
  },
  containerComments: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 0,
    padding: 15,
    alignSelf: 'center',
    // flex: 1,
    width: '100%',
    height: '100',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    alignItems: 'center',
  },
  author: {
    fontSize: 18,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    alignItems: 'center',
  },

  separatorLine: {
    height: 1,
    backgroundColor: 'plum',
    paddingTop: 2,
  },
})
