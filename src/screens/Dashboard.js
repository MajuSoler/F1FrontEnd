import React from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GeneralArticles from '../components/GeneralArticles'
import SpecificArticle from '../components/SpecificArticle'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GeneralArticles />
    </View>
  )
}

function FriendsScreen({ navigation, title }) {
  console.log(title, 'this is the title')
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
