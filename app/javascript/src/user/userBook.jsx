import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class UserBook extends React.Component {
  state = {
    bookings: [],
    properties: [],
    bookedProperties: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/user/${this.props.user_id}/bookings`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          bookings: data.bookings,
        })
      })
      .then(() => {
        this.bookedProperties();
      })
  }

  bookedProperties = () => {
    fetch(`/api/properties/user/${this.props.user_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
        })
      })
      .then(() => {
        if (this.state.bookings.length > 0) {
          this.blend();
        }
      })
  }

  blend = () => {
    const { bookings, properties } = this.state;
    const bookedProperties = [];
    for (let i = 0; i < bookings.length; i++) {
      for (let j = 0; j < properties.length; j++) {
        if (bookings[i].property_id === properties[j].id) {
          bookedProperties.push(
            {
              id: bookings[i].id,
              property_id: properties[j].id,
              title: properties[j].title,
              price_per_night: properties[j].price_per_night,
              image_url: properties[j].image_url,
              start_date: bookings[i].start_date,
              end_date: bookings[i].end_date,
              is_paid: bookings[i].is_paid,
            }
          )
        }
      }
    }
    this.setState({
      bookedProperties: bookedProperties,
      loading: false,
    })
  }

  initiateStripeCheckout = (booking_id) => {
    fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(response => {
      const stripe = stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

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
      this.setState({
        error: error.message,
      })
    })
  }

  render () {
    const { bookedProperties, loading } = this.state;

    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
                    <p className="card-text">Price: ${property.price_per_night}</p>
                    <p className="card-text">Start Date: {property.start_date}</p>
                    <p className="card-text">End Date: {property.end_date}</p>
                    <p className="card-text">Paid: {property.is_paid ? 'Yes' : 'No'}</p>
                    <a href={`/property/${property.property_id}`} className="btn btn-primary">View Property</a>
                    {property.is_paid ? '' : <button className="btn btn-danger ms-5" onClick={() => this.initiateStripeCheckout(property.id)}>Pay Now</button>}
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