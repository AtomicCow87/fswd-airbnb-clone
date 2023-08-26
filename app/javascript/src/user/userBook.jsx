import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class UserBook extends React.Component {
  state = {
    bookings: [],
    properties: [],
    loading: true,
    error: null,
  }

  componentDidMount() {
    fetch(`/api/user/${this.props.user_id}/bookings`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          bookings: data.bookings,
          properties: data.properties,
        })
      })
      .then(() => { 
        if (this.state.bookings.length == 0) {
          this.setState({
            loading: false,
          })
        }
        this.formatBookings();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
        })
      })
  }

  formatBookings = () => {
    const { bookings, properties } = this.state;
    const bookedProperties = [];

    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].property_id === properties[i].id) {
        const start_date = new Date(bookings[i].start_date);
        const end_date = new Date(bookings[i].end_date);
        const days = (end_date - start_date) / (1000 * 60 * 60 * 24);
        const total_price = days * properties[i].price_per_night;

        bookedProperties.push(
          {
            id: bookings[i].id,
            property_id: properties[i].id,
            title: properties[i].title,
            price_per_night: properties[i].price_per_night,
            start_date: bookings[i].start_date,
            end_date: bookings[i].end_date,
            is_paid: bookings[i].is_paid,
            total_price: total_price,
          }
        )
      }
    }
    this.setState({
      bookedProperties: bookedProperties,
      loading: false,
    })
  }

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
  
        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
          this.setState({
            error: result.error.message,
          })
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
        })
      })
  }  

  render () {
    const { bookings, loading, bookedProperties } = this.state;

    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }

    if (bookings.length == 0) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-12">
              <h2>My Bookings</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>You have not booked any properties yet.</p>
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <div>
        <h1>My Bookings</h1>
        <div className="row">
          {bookedProperties.map(property => {
            return (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={property.id}>
                <div className="card w-75">
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text"><b>Your Total:</b> ${property.total_price}</p>
                    <p className="card-text">Price Per Night: ${property.price_per_night}</p>
                    <p className="card-text">Start Date: {property.start_date}</p>
                    <p className="card-text">End Date: {property.end_date}</p>
                    <p className="card-text">Paid: {property.is_paid ? 'Yes' : 'No'}</p>
                    <a href={`/property/${property.property_id}`} className="btn btn-primary">View Property</a>
                    {property.is_paid ? 
                      "" : (
                      <button className="btn btn-warning ms-3" onClick={() => this.initiateStripeCheckout(property.id)}>Pay Now</button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

export default UserBook;