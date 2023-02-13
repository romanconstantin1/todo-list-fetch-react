import React from 'react'

import PropTypes from 'prop-types'

export const Task = ({ task, removeItem }) => {
  const [show, setShow] = React.useState(false)
  const showDelete = () => setShow(true)
  const hideDelete = () => setShow(false)

  const { id, label } = task

  return (
    <li
      key={id}
      className='list-group-item d-flex justify-content-between align-items-center'
      onMouseOver={showDelete}
      onMouseLeave={hideDelete}
    >
      <strong>{label}</strong>
      {show && (
        <span
          type='button'
          className='btn btn-danger btn-sm'
          onClick={() => removeItem(id)}
        >
          <strong>Delete</strong>
        </span>
      )}
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  removeItem: PropTypes.func.isRequired
}
