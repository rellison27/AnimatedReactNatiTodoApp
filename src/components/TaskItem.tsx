import React, {useCallback, useState} from "react";
import { Pressable} from "react-native";
import { Box, useColorModeValue, useColorMode, themeTools } from "native-base";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";

interface Props {
    taskLabel: string
}

const TaskItem = (props: Props) => {
  const {taskLabel} = props
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

  return (
    <Box width={30} height={30} mr={2}>
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
  )
}

export default TaskItem