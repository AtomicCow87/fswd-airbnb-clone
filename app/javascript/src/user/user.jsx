import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './user.scss';

class User extends React.Component {
  state = {
    authenticated: false,
    username: null,
    user_id: null,
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({ 
          authenticated: data.authenticated,
          username: data.username,
          user_id: data.user_id,
        });
      })
      .then(() => {
        this.getProperties();
      })
  }

  getProperties = () => {
    fetch(`/api/properties/${this.state.user_id}?page=1`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/properties/${this.state.user_id}?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  render() {
    const { authenticated, username, properties, next_page, loading } = this.state;

    let page = window.location.pathname.replace('/user/', '')

    console.log(properties)

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
            {properties.map(property => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                </div>
              )
            })}
          </div>
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          } 
        </div>
      </Layout>
    )
  }
}

export default User;