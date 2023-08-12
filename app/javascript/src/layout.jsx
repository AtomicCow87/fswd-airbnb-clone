// layout.js
import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

let authenticated = false;
let username = null;

function checkAuth() {
  fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      if (data.authenticated) {
        authenticated = true;
        username = data.username;
      }
    })
}

checkAuth();

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {authenticated ? (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/properties/new">Host your home</a>
                </li>              
                <li className="nav-item">
                  <a className="nav-link" href={`/users/${username}`}>My Account</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/logout">Logout</a>
                </li>               
              </ul>
            ) : (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/properties/new">Host your home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login or Signup</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
