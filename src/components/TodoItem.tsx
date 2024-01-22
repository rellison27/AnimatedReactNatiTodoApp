import React, {useCallback, useState} from "react";
import { NativeSyntheticEvent, Pressable, TextInputChangeEventData} from "react-native";
import { 
  Box,
  useColorModeValue,
  useColorMode,
  themeTools,
  Icon,
  HStack,
  Input,
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
    isEditing: boolean
    onChangeTaskLabel: (taskLabel: string) => void
    onEndEditingTaskLabel: () => void
}

const TaskItem = (props: Props) => {
  const { 
    taskLabel,
    onPressLabel,
    onRemove,
    isEditing,
    onChangeTaskLabel,
    onEndEditingTaskLabel,
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
  const handlehangeTaskLabel = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    onChangeTaskLabel && onChangeTaskLabel(e.nativeEvent.text)
  }, [onChangeTaskLabel])

  const renderRightActions = () => (
    <Box
      bg="red.500"
      justifyContent="center"
      alignItems="flex-end"
      p={4}>
      <Icon as={<Feather name="trash-2"/>} size="sm" color="white" />
    </Box>
 )
  return (
    <Swipeable
      friction={1}
      rightThreshold={-75}
      renderRightActions={(progress, dragX) => renderRightActions()}
    >
      <HStack 
        alignItems="center" 
        px={4}
        py={2} 
        w="full"
        bg={useColorModeValue('warmGray.50', 'blueGray.900')}>
        {/* <Box mr={2}> */}
            <BouncyCheckbox
              size={25}
              fillColor={useColorModeValue('#FF0000', '#FFDB58')}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: useColorModeValue('#FF0000', '#FFDB58') }}
              onPress={handleIsChecked}
              />
            {isEditing
              ? 
                <Input 
                  placeholder="Example label" 
                  value={taskLabel} 
                  variant="unstyled"
                  onChange={handlehangeTaskLabel}
                  fontSize={20}
                  px={2}
                  py={0}
                  autoFocus
                  bluronSubmit
                  onBlur={onEndEditingTaskLabel}
                  />
              :
                <Text
                  fontSize={20}
                  px={2}
                  py={0}
                  onPress={onPressLabel}
                  color={isChecked ? 'gray.400' : activeTextColor}
                  textDecorationLine={isChecked ? 'line-through' : 'none'}
                  textDecorationColor={isChecked ? 'gray.400' : activeTextColor}
                  >
                  {taskLabel}
                </Text>              
            }
        {/* </Box> */}
      </HStack>
    </Swipeable>
  )
}

export default TaskItem