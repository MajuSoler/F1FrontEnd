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
  TouchableOpacity,
} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GeneralArticles from '../components/GeneralArticles'
import SpecificArticle from '../components/SpecificArticle'
import Header from '../components/Header'
import Background from '../components/Background'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { selectToken } from '../store/user/selectors'
import { appLoading } from '../store/appState/selectors'
import { selectArticles } from '../store/articles/selectors'
import { fetch_sucess } from '../store/articles/actions'

function HomeScreen({ navigation }) {
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
      content={item.content}
      url={item.url}
    />
  )

  const ArticleInfo = ({
    title,
    author,
    description,
    urlToImage,
    content,
    url,
  }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.text}>{description}</Text>
      <Image
        source={{ uri: urlToImage }}
        style={{ width: '100%', height: 160, marginBottom: 30 }}
      />
      <Button
        style={styles.button}
        onPress={() =>
          navigation.navigate('Article', {
            paramKey: { title, author, urlToImage, content, description, url },
          })
        }
      >
        <Text style={styles.link}>Read more</Text>
      </Button>
    </View>
  )
  return (
    <View style={styles.container}>
      <Header>News!</Header>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#c1262c"
          style={{ marginBottom: 30 }}
        />
      ) : (
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <FlatList
            data={articlesSelected}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      )}
    </View>
  )
}

function FriendsScreen({ navigation, title }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <SpecificArticle /> */}
    </View>
  )
}

const Tab = createBottomTabNavigator()

export default function Dashboard() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={HomeScreen} />
      <Tab.Screen name="FriendsScreen" component={FriendsScreen} />
    </Tab.Navigator>
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
    height: 700,
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
    fontSize: 30,
    alignItems: 'center',
    marginBottom: 10,
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
  separatorLine: {
    height: 1,
    backgroundColor: 'plum',
    paddingTop: 2,
  },
})
