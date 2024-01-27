import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/MainScreen'
import CompletedScreen from './screens/CompletedScreen'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="To-do's" component={MainScreen} />
      <Drawer.Screen name="Completed" component={CompletedScreen} />
    </Drawer.Navigator>
  )
}

export default App
