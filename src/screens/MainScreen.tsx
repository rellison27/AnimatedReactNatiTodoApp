import React, {useState} from 'react'
import {
  Text,
  Box,
  Center,
  VStack,
  themeTools,
  useTheme,
  useColorMode,
  useColorModeValue,
} from 'native-base'
import ThemeToggle from '../components/ThemeToggle'
import { StyleSheet, View, Pressable } from 'react-native'
import TodoItem from '../components/TodoItem'

export default function MainScreen() {

  const { colorMode, toggleColorMode } = useColorMode()
  const [todoLabel, setTodoLabel] = useState<string>('Example Label')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full" >
        <TodoItem 
          label={todoLabel}
          isEditing={isEditing}
          onChangeTodoLabel={setTodoLabel}
          onPressLabel={() => setIsEditing(true)}
          onEndEditingTodoLabel={() => setIsEditing(false)}
          />
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkbox: {
    width: 64,
    height: 64
  }
})
