// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})