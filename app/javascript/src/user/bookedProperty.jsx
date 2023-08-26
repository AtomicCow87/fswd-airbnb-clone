import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookedProperty extends React.Component {
  state = {
    bookings: [],
    properties: [],
    bookedProperties: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/user/${this.props.user_id}/booked_properties`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          bookings: data.bookings,
          properties: data.properties,
          loading: false,
        })
      })
  }

  render() {
    const { bookedProperties, properties, loading } = this.state;

    if (loading) {
      return (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }

    if (properties.length == 0) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-12">
              <h2>My Booked Properties</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>You have no booked properties.</p>
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <h2>My Booked Properties</h2>
          </div>
        </div>
        <div className="row">
          {bookedProperties.map(property => {
            return (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={`property_${property.id}`}>
                <div className="card w-75">
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">Start Date: {property.start_date}</p>
                    <p className="card-text">End Date: {property.end_date}</p>
                    <p className="card-text">Price per night: ${property.price_per_night}</p>
                    <p className="card-text">Paid: {property.is_paid ? 'Yes' : 'No'}</p>
                    <a href={`/properties/${property.property_id}`} className="btn btn-sm btn-primary mt-auto">View Property</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default BookedProperty;