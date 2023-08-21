import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './user.scss';

class User extends React.Component {
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
        });
      })
  }

  render() {
    const { authenticated, username } = this.state;
    if (!authenticated) {
      return (
        <Layout>
          <h1>Log in to view this page</h1>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>{username}</h1>
        </Layout>
      )
    }
  }
}

export default User;