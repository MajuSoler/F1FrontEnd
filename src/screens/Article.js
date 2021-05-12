import React from 'react'
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

import GeneralComments from '../components/Comments'
import { selectComments } from '../store/comments/selectors'

import { selectToken } from '../store/user/selectors'

export default function Articles({ route }) {
  const comments = useSelector(selectComments)
  const token = useSelector(selectToken)

  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' margin= 5px  }}>
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{route.params.paramKey.title}</Text>
        {/* <Text style={styles.author}>{route.params.paramKey.author}</Text> */}
        <Text style={styles.text}>{route.params.paramKey.description}</Text>
      </View>
      <View>
        <GeneralComments url={route.params.paramKey.url} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 30,
    padding: 15,
    // alignSelf: 'center',
    width: '100%',
    height: '40%',
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
