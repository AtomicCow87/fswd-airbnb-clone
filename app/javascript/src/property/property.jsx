// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    authenticated: false,
    username: null,
    sameUser: false,
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        })
      })
    this.checkAuth();
  }

  checkAuth = () => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (data.authenticated) {
          this.setState({ 
            authenticated: true,
            username: data.username, 
          });
        }
      })
      .then(() => {
        this.setState({ sameUser: this.sameUser() });
      })
  }

  sameUser = () => {
    const { property, username } = this.state;
    if (property.user) {
      return property.user.username === username;
    }
    return false;
  }
    

  render () {
    const { property, loading, sameUser } = this.state;
    
    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = property

    return (
      <Layout>
        <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="me-3">{max_guests} guests</span>
                  <span className="me-3">{bedrooms} bedroom</span>
                  <span className="me-3">{beds} bed</span>
                  <span className="me-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
              <div className="py-5">
                {sameUser ? (
                  <a className="btn btn-outline-info btn-sm me-3" href={`/properties/${id}`}>Edit</a>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Property