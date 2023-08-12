import React from 'react'
import ReactDOM from 'react-dom'
import NewProperty from './new_property';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <NewProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})