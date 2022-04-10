import React from 'react'
import { registerRootComponent } from 'expo'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/MainScreen'
import AboutScreen from './screens/AboutScreen'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default App
