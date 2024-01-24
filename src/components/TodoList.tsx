import React, { useCallback, useRef } from "react";
import { AnimatePresence, View } from "moti";
import { FlatList } from "react-native";
import { PanGestureHandlerProps, ScrollView } from "react-native-gesture-handler";
import TodoItem from "./TodoItem";

interface TodoItemData {
    id: string
    label: string
    isChecked: boolean
}

interface TodoListProps {
    todos: Array<TodoItemData>
    editingItemId: string | null
    onToggleTodoItem: (todo: TodoItemData) => void
    onChangeTodoLabel: (todo: TodoItemData, newLabel: string) => void
    onEndEditingTodoLabel: (todo: TodoItemData) => void
    onRemoveTodo: (todo: TodoItemData) => void
    onPressLabel: (todo: TodoItemData) => void
}

interface TodoItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    todo: TodoItemData
    isEditing: boolean
    onToggleTodoItem: (todo: TodoItemData) => void
    onChangeTodoLabel: (todo: TodoItemData, newLabel: string) => void
    onEndEditingTodoLabel: (todo: TodoItemData) => void
    onPressLabel: (todo: TodoItemData) => void
    onRemoveTodo: (todo: TodoItemData) => void
}

export const AnimatedTodoItem = (props: TodoItemProps) => {
    const {
        todo,
        isEditing,
        onToggleTodoItem,
        onChangeTodoLabel,
        onEndEditingTodoLabel,
        onPressLabel,
        onRemoveTodo
    } = props

    const handleToggleCheckBox = useCallback(() => {
        onToggleTodoItem(todo)
    }, [todo, onToggleTodoItem])

    const handleChangeLabel = useCallback((label: string) => {
        onChangeTodoLabel(todo, label)
    }, [todo, onChangeTodoLabel])

    const handleEndEditingLabel = useCallback(() => {
        onEndEditingTodoLabel(todo)
    }, [todo, onEndEditingTodoLabel])

    const handlePressLabel = useCallback(() => {
        onPressLabel(todo)
    }, [todo, onPressLabel])

    const handleRemove = useCallback(() => {
        onRemoveTodo(todo)
    }, [todo, onRemoveTodo])

    return (
        <View 
            from={{
                opacity: 0,
                scale: 0.5,
                marginBottom: -46
            }}
            animate={{
                opacity: 1,
                scale: 1,
                marginBottom: 0
            }}
            exit={{
                opacity: 0,
                scale: 0.5,
                marginBottom: -46
            }}
        >
            <TodoItem
                label={todo.label}
                isEditing={isEditing}
                onChangeTodoLabel={handleChangeLabel}
                onPressLabel={handlePressLabel}
                onEndEditingTodoLabel={handleEndEditingLabel}
                onRemove={handleRemove}
            />
        </View>
    )
}

export default function TodoList(props: TodoListProps) {
    const {
        todos,
        editingItemId,
        onChangeTodoLabel,
        onToggleTodoItem,
        onEndEditingTodoLabel,
        onPressLabel,
        onRemoveTodo
    } = props

    const refScrollView = useRef(null)

    return (
        <ScrollView ref={refScrollView} >
            <AnimatePresence>
                  {todos.map((todo) => (
                    <AnimatedTodoItem
                        key={todo.id}
                        todo={todo}
                        isEditing={todo.id === editingItemId}
                        onChangeTodoLabel={onChangeTodoLabel}
                        onPressLabel={onPressLabel}
                        onEndEditingTodoLabel={onEndEditingTodoLabel}
                        onRemoveTodo={onRemoveTodo} 
                        onToggleTodoItem={onToggleTodoItem}
                    />
                    ))}                  
            </AnimatePresence>
        </ScrollView>
    )

}