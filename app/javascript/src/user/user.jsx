import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './user.scss';

class User extends React.Component {
  state = {
    authenticated: false,
    username: null,
    user_id: null,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({ 
          authenticated: data.authenticated,
          username: data.username,
          user_id: data.user_id,
        });
      })
      .then(() => {
        if (this.state.authenticated) {
          this.getProperties();
        }
      })
  }

  getProperties = () => {
    fetch('/api/properties/index_by_user')
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          properties: data.properties,
        })
      })
  }

  render() {
    const { authenticated, username, properties } = this.state;

    let page = window.location.pathname.replace('/user/', '')

    if (!authenticated) {
      return (
        <Layout>
          <div className="border p-4 mb-4">
            Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to see.
          </div>
        </Layout>
      );
    }

    if (page != username) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3 py-5">
                <h1>Hmmm... You seem to be in the wrong place.</h1>                
              </div>
              <div className="col-12 col-md-6 offset-md-3 pb-5">
                <h3>Try going to your <a href={`/user/${username}`}>profile</a> instead.</h3>
              </div>
            </div>
          </div>
        </Layout>
      )
    }
      
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-auto py-5">
              <h1>Welcome, {username}!</h1>
            </div>
          </div>
          <div className="row">

          </div> 
        </div>
      </Layout>
    )
  }
}

export default User;