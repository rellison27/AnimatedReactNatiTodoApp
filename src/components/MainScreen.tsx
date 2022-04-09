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
import ThemeToggle from './ThemeToggle'
import TaskItem from './TaskItem'

export default function MainScreen() {

  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={4} alignItems="center">
        <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
        <TaskItem taskLabel="Example label" />
      </VStack>
    </Center>
  )
}
