import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './booking.scss';

class Booking extends React.Component {
  state = {
    booking: [],
    property: [],
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
        console.log(data);
        this.setState({
          booking: data.booking,
          property: data.property,
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
    const { booking, property, loading, error } = this.state;

    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }

    return (
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 m-5 text-center">
              <h1>Your Booking has been submitted!</h1>              
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 m-5 text-center">
              <h2>Booking Details</h2>
              <p>Booking ID: {booking.id}</p>
              <p>Check In: {booking.check_in}</p>
              <p>Check Out: {booking.check_out}</p>
              <p>Guests: {booking.guests}</p>
              <p>Total: {booking.total}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Booking;