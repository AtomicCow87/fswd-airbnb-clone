import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import UserBook from './userBook';
import BookedProperty from './bookedProperty';

import './user.scss';

class User extends React.Component {
  state = {
    authenticated: false,
    username: null,
    user_id: null,
    show_bookings: true,
    loading: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({ 
          authenticated: data.authenticated,
          username: data.username,
          user_id: data.user_id,
          loading: false,
        });
      })
  }

  toggle = () => {
    this.setState({
      show_bookings: !this.state.show_bookings,
    })
  }

  render() {
    const { authenticated, username, show_bookings, user_id, loading } = this.state;

    let page = window.location.pathname.replace('/user/', '')

    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }

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
          <div className="row pb-5">
            <div className="col-md-auto">
              <button className="btn btn-outline-info btn-sm" onClick={this.toggle}>{show_bookings ? 'Show Booked Properties' : 'Show My Bookings'}</button>
            </div>
          </div>
          <div className="row">
            {show_bookings ? <UserBook user_id={user_id} toggle={this.toggle} /> : <BookedProperty user_id={user_id} toggle={this.toggle} />}
          </div> 
        </div>
      </Layout>
    )
  }
}

export default User;