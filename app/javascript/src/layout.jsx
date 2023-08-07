// layout.js
import React from 'react';

const Layout = (props) => {

  console.log(props);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.authenticated ? (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>               
                  <li className="nav-item">
                    <a className="nav-link" href={`/users/${props.username}`}>My Account</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={`/users/${props.username}/bookings`}>My Bookings</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">Logout</a>
                  </li>               
              </ul>
            ) : (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/logout">Logout</a>
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
