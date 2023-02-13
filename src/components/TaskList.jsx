import React from 'react'

import PropTypes from 'prop-types'

import { Task } from './Task.jsx'

export const TaskList = ({ items, removeItem }) =>
  items.map(entry => (
    <Task key={entry?.id} task={entry} removeItem={removeItem} />
  ))

TaskList.propTypes = {
  items: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  removeItem: Task.propTypes.removeItem
}
