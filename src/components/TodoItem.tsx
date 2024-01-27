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
 } from "native-base";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from "@expo/vector-icons";
import { PanGestureHandlerProps } from "react-native-gesture-handler";

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    label: string
    isChecked?: boolean
    onPressLabel?: () => void
    onRemove?: () => void
    isEditing: boolean
    onChangeTodoLabel: (todoLabel: string) => void
    onEndEditingTodoLabel: () => void
}

const TodoItem = (props: Props) => {
  const { 
    label,
    onPressLabel,
    onRemove,
    isEditing,
    onChangeTodoLabel,
    onEndEditingTodoLabel,
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

  const colors = useTheme().colors
  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleIsChecked = () => setIsChecked(!isChecked)
  const handleChangeTodoLabel = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    onChangeTodoLabel && onChangeTodoLabel(e.nativeEvent.text)
  }, [onChangeTodoLabel])

  const renderRightActions = () => (
    <Box
      bg="red.500"
      justifyContent="center"
      alignItems="flex-end"
      p={4}>
      <Icon as={<Feather name="trash-2"/>} size="sm" color="white" onPress={onRemove} />
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
        py={4} 
        w="full"
        bg={colors.background}>
            <BouncyCheckbox
              size={25}
              fillColor={colors.primary}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: colors.border }}
              onPress={handleIsChecked}
              />
            {isEditing
              ? 
                <Input 
                  placeholder="What do you need to do?" 
                  value={label} 
                  color={colors.text}
                  variant="unstyled"
                  onChange={handleChangeTodoLabel}
                  fontSize={20}
                  px={2}
                  py={0}
                  autoFocus
                  bluronSubmit
                  onBlur={onEndEditingTodoLabel}
                  />
              :
                <Text
                  fontSize={20}
                  px={2}
                  py={0}
                  onPress={onPressLabel}
                  color={isChecked ? 'gray.400' : colors.text}
                  textDecorationLine={isChecked ? 'line-through' : 'none'}
                  textDecorationColor={isChecked ? 'gray.400' : colors.text}
                  >
                  {label}
                </Text>              
            }
      </HStack>
    </Swipeable>
  )
}

export default TodoItem