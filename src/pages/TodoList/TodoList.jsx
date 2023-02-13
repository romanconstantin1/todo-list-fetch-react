import React, { useEffect, useState } from 'react'

import { clearItems, getItems, initialState, updateItems } from './repository'
import { TodoListContainer } from './TodoList.container.jsx'

export const TodoList = () => {
  const [state, setState] = useState(initialState)

  const handleUpdate = (key, value) =>
    setState(prev => ({ ...prev, [key]: value }))

  const removeItem = async entryId => {
    const newList = state.items.filter(entry => entry.id !== entryId)
    handleUpdate('items', newList)
    await updateItems(initialState.items)
  }

  const addItem = async event => {
    const isEnterAndNotEmpty =
      event.key === 'Enter' && event.target.value !== ''

    if (!isEnterAndNotEmpty) return

    const newItem = {
      id: state?.items?.length ?? 0,
      label: event.target.value,
      done: false
    }

    const newList = [...state.items, newItem]
    setState(prev => ({ ...prev, items: newList, input: '' }))
    await updateItems(newList)
  }

  const handleInputChange = event => handleUpdate('input', event.target.value)

  const initState = async () => {
    const items = await getItems()
    if (!items) return
    const transformedItems = items.map((item, index) => ({
      ...item,
      id: index
    }))
    setState(prev => ({ ...prev, items: transformedItems, loading: false }))
  }

  const clearList = async () => {
    if (
      state.items.length !== 0 &&
      confirm('Delete all tasks - are you sure?')
    ) {
      handleUpdate('items', initialState.items)
      return await clearItems()
    }
    return alert('no tasks to delete!')
  }

  useEffect(() => {
    initState()
  }, [])

  return (
    <TodoListContainer
      {...{ handleInputChange, state, addItem, removeItem, clearList }}
    />
  )
}
