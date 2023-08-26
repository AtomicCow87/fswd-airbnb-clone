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
        if (this.state.bookings.length == 0) {
          this.setState({
            loading: false,
          })
          return;
        }
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

  render () {
    const { bookedProperties, bookings, loading } = this.state;

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
                    <p className="card-text">Price: ${property.price_per_night}</p>
                    <p className="card-text">Start Date: {property.start_date}</p>
                    <p className="card-text">End Date: {property.end_date}</p>
                    <p className="card-text">Paid: {property.is_paid ? 'Yes' : 'No'}</p>
                    <a href={`/property/${property.property_id}`} className="btn btn-primary">View Property</a>
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