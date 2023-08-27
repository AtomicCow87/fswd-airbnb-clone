import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './booking.scss';

class Booking extends React.Component {
  state = {
    booking: [],
    property: [],
    charge: [],
    user: [],
    loading: true,
    error: null,
  }

  componentDidMount() {
    const url = window.location.href;
    const split = url.split('/');
    const ID = split[split.length - 2];
    fetch(`/api/bookings/${ID}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          booking: data.booking,
          property: data.property,
          charge: data.charge,
          propertyuser: data.propertyuser,
          bookinguser: data.bookinguser,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ 
          error: error, 
          loading: false
        });
      });
  }

  render() {
    const { booking, property, charge, loading, propertyuser, bookinguser, error } = this.state;

    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-5">
              <h1>Your Booking has been submitted!</h1>              
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 m-5">
              <h3>Your payment is currently processing.</h3>
              <p>Check your <a href={`/user/${bookinguser.username}`}>Account Page</a> to see your updated payment status.</p>
            </div>
          </div>
          <div className="row">
            <div className="col ms-5">
              <h2>Booking Details</h2>
              <p>Booking ID: {booking.id}</p>
              <p>Check In: {booking.start_date}</p>
              <p>Check Out: {booking.end_date}</p>
              <p>Total: ${charge.amount}</p>
            </div>
            <div className="col">
              <h2>Property Details</h2>
              <p>Property Name:  <a href={`/property/${property.id}`}>{property.title}</a></p>
              <p>Property City: {property.city}</p>
              <p>Property Price: {property.price_per_night}</p>
              <p>Property Capacity: {property.max_guests}</p>
              <p>Property Owner: {propertyuser.username}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Booking;