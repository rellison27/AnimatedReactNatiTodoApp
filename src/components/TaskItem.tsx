import React, {useCallback, useState} from "react";
import { Pressable} from "react-native";
import { 
  Box,
  useColorModeValue,
  useColorMode,
  themeTools,
  Icon,
  HStack,
  Text,
  Checkbox
 } from "native-base";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from "@expo/vector-icons";
import { PanGestureHandlerProps } from "react-native-gesture-handler";

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    taskLabel: string
    isChecked?: boolean
    onPressLabel?: () => void
    onRemove?: () => void
}

const TaskItem = (props: Props) => {
  const { 
    taskLabel,
    onPressLabel,
    onRemove,
    simultaneousHandlers
   } = props
  const theme = useTheme()
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400'),
  )
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText'),
  )

  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleIsChecked = () => setIsChecked(!isChecked)
 const renderRightActions = () => (
    <Box
          bg="red.500"
          w="full"
          h="full"
          justifyContent="center"
          alignItems="flex-end"
          pr={4}
        >
          <Icon as={<Feather name="trash-2"/>} size="sm" color="white" />
        </Box>
 )
  return (
    <Swipeable
      friction={1}
      leftThreshold={30}
      renderRightActions={(progress, dragX) => renderRightActions()}
    >
        <HStack 
          alignItems="center" 
          px={4}
          py={2} 
          w="full"
          bg={useColorModeValue('warmGray.50', 'primary.900')}>
      <Box mr={2}>
          <BouncyCheckbox
            size={25}
            fillColor={useColorModeValue('#FF0000', '#FFDB58')}
            unfillColor="#FFFFFF"
            text={taskLabel}
            iconStyle={{ borderColor: useColorModeValue('#FF0000', '#FFDB58') }}
            textStyle={{ fontFamily: 'JosefinSans-Regular' }}
            onPress={handleIsChecked}
          />
      </Box>
      </HStack>
      </Swipeable>
  )
}

export default TaskItem