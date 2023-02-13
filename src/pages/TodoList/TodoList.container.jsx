import React from 'react'

import PropTypes from 'prop-types'

import { TaskListWrapper } from '../../components/TaskListWrapper.jsx'

export const TodoListContainer = ({
  handleInputChange,
  state,
  addItem,
  removeItem,
  clearList
}) => {
  return (
    <div className='row justify-content-center'>
      <div className='col m-2 col-lg-10'>
        <h1 className='mt-5 text-center'>Minimalist to-do list</h1>
        <ul className='shadow d-flex list-group mt-3'>
          <input
            type='text'
            value={state?.input}
            className='list-group-item input-group'
            placeholder='What do I need to do today?'
            onChange={handleInputChange}
            onKeyUp={addItem}
          />
          <TaskListWrapper
            {...state}
            removeItem={removeItem}
            clearList={clearList}
          />
        </ul>
      </div>
    </div>
  )
}
TodoListContainer.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  state: PropTypes.shape({
    items: TaskListWrapper.propTypes.items,
    input: PropTypes.string.isRequired,
    loading: TaskListWrapper.propTypes.loading
  }).isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired
}
