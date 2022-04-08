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
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import ThemeToggle from './ThemeToggle'

export default function MainScreen() {

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleIsChecked = () => setIsChecked(!isChecked)
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
        <BouncyCheckbox
          size={25}
          fillColor={useColorModeValue('#FF0000', '#FFDB58')}
          unfillColor="#FFFFFF"
          text="Custom Checkbox"
          iconStyle={{ borderColor: useColorModeValue('#FF0000', '#FFDB58') }}
          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
          onPress={handleIsChecked}
        />
      </VStack>
    </Center>
  )
}
