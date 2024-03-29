import React, {useState, useCallback} from 'react'
import {
  Center,
  useColorModeValue,
  Icon,
} from 'native-base'
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Fab } from 'native-base'
import TodoList from '../components/TodoList'
import shortid from 'shortid'

const initialTodos = [
  {
    id: shortid.generate(),
    label: "Buy wife a present for birthday",
    isChecked: false
  },
  {
    id: shortid.generate(),
    label: "Turn on heater in Auguste's room",
    isChecked: false
  }
]

export default function MainScreen() {
  const [todos, setTodos] = useState(initialTodos)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleChangeTodoItemLabel = useCallback((todo, newLabel) => {
    setTodos(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(todo)
      newData[index] = {
        ...todo,
        label: newLabel
      }
      return newData
    })
  }, [])

  const handleEndEditingLabel = useCallback(() => {
      setEditingItemId(null)
  }, [])

  const handlePressTodoLabel = useCallback( todo => {
    setEditingItemId(todo.id)
  }, [])

  const handleRemoveTodo = useCallback( todo => {
    setTodos(prevData => {
      const newData = prevData.filter(i => i !== todo)

      return newData
    })
  },[])

  const handleAddNewTodo = () => {
    const id = shortid.generate()
    setTodos([
      {
        id,
        label: '',
        isChecked: false
      },
      ...todos
    ])
    setEditingItemId(id)
  }

  const colors = useTheme().colors

  return (
    <Center
      _dark={{ bg: colors.background }}
      _light={{ bg: colors.background }}
      flex={1}
    >
        <TodoList 
          todos={todos}
          editingItemId={editingItemId}
          onToggleTodoItem={() => false}
          onChangeTodoLabel={handleChangeTodoItemLabel}
          onEndEditingTodoLabel={handleEndEditingLabel}
          onRemoveTodo={handleRemoveTodo}
          onPressLabel={handlePressTodoLabel}
        />
        
      <Fab 
        position="absolute"
        renderInPortal={false} 
        size="sm"
        colorScheme={colors.primary}
        bg={useColorModeValue('blue.500', 'blue.400')}
        icon={<Icon color="white" as={<AntDesign name='plus' />} size="sm"/>}
        onPress={handleAddNewTodo}
      />
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
