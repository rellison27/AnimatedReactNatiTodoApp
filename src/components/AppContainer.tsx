import * as React from 'react'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { useColorScheme } from 'react-native';

type Props = {
  children: React.ReactNode
}

export default function AppContainer(props: Props) {
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider >{props.children}</NativeBaseProvider>
    </NavigationContainer>
  )
}
