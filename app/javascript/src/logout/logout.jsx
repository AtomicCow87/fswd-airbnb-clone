// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './logout.scss';

class Logout extends React.Component {
  state = {
    authenticated: false,
    username: null,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          username: data.username,
        })
      })
  }

  endSession = () => {
    fetch('/api/sessions/', safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          this.setState({
            authenticated: false,
            username: null,
          })
        }
      })
  }


  render () {
    const { authenticated, username } = this.state;
    if (!authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are not logged in 😞</p>
                </div>
                <div className="border p-4">
                  <a href="/login">Login</a>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <p className="mb-0">Are you sure you want to log out {username}?</p>
                <button className="btn btn-danger" onClick={this.endSession}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )   
  }
}

export default Logout;