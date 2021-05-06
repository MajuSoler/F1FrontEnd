/* eslint-disable react/destructuring-assignment */
import React from 'react'

import { Text, View, ActivityIndicator, Image } from 'react-native'

import Background from './Background'
import Header from './Header'
import Paragraph from './Paragraph'
import Button from './Button'

export default function PreviewOfArticle(article) {
  return (
    <Background>
      <Header>This is the title{article.title}</Header>
      <View style={{ marginHorizontal: 40, marginVertical: 60 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 30 }}>
          this is the descriptions {article.description}
        </Text>
        {/* <Image
          source={article.url}
          style={{ width: '100%', height: 160, marginBottom: 30 }}
        /> */}
        <View
          style={{
            borderWidth: 2,
            borderColor: 'black',
            padding: 20,
            marginBottom: 30,
          }}
        >
          <Text>this is the author{article.author}</Text>
        </View>
      </View>
    </Background>
  )
}
