import React from 'react'
import ReactDOM from 'react-dom'
import Booking from './booking';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Booking />,
    document.body.appendChild(document.createElement('div')),
  )
})