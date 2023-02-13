import React from 'react'

import PropTypes from 'prop-types'

export const TaskCounter = ({ taskCount }) => {
  const noTasks = taskCount === 0
  const singleTask = taskCount === 1
  const multipleTasks = taskCount > 1

  const taskCountTitle = noTasks ? 'No' : singleTask ? '1' : taskCount
  const taskWord = multipleTasks || noTasks ? 'tasks' : 'task'
  const goodJob = noTasks ? '👏' : ''

  return (
    <li className='list-group-item w-100'>
      <small>
        <strong>{taskCountTitle}</strong> {taskWord} left{' '}
        <strong>{goodJob}</strong>
      </small>
    </li>
  )
}

TaskCounter.propTypes = {
  taskCount: PropTypes.number.isRequired
}
