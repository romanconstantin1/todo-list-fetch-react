import React from 'react'

import PropTypes from 'prop-types'

import { Loader } from './Loader.jsx'
import { TaskCounter } from './TaskCounter.jsx'
import { TaskList } from './TaskList.jsx'

export const TaskListWrapper = ({ items, removeItem, loading, clearList }) => {
  const noTasks = items.length === 0
  if (loading) return <Loader />
  if (noTasks) return <TaskCounter taskCount={0} />
  return (
    <>
      <TaskList items={items} removeItem={removeItem} />
      <TaskCounter taskCount={items.length} />
      <li className='list-group-item w-100 text-center'>
        <button
          className='bg-transparent border-0'
          style={{ color: '#E22626' }} //delete all tasks button
          onClick={clearList}
        >
          <strong>Delete all tasks</strong>
        </button>
      </li>
    </>
  )
}

TaskListWrapper.propTypes = {
  ...TaskList.propTypes,
  items: TaskList.propTypes.items || [],
  loading: PropTypes.bool.isRequired,
  clearList: PropTypes.func.isRequired
}
