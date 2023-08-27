import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookedProperty extends React.Component {
  state = {
    bookings: [],
    properties: [],
    users: [],
    bookedProperties: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/user/${this.props.user_id}/booked_properties`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          bookings: data.bookings,
          properties: data.properties,
          users: data.users,
        })
      })
      .then(() => { 
        if (this.state.bookings.length == 0) {
          this.setState({
            loading: false,
          })
          return;
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
    const { bookings, properties, users } = this.state;
    const bookedProperties = [];

    for (let i = 0; i < properties.length; i++) {
      if (bookings[i].property_id === properties[i].id) {
        const start_date = new Date(bookings[i].start_date);
        const end_date = new Date(bookings[i].end_date);
        const days = (end_date - start_date) / (1000 * 60 * 60 * 24);
        const total_price = days * properties[i].price_per_night;

        const temp = bookings[i].user_id;
        const username = users.find(user => user.id === temp).username;

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
            days: days,
            username: username,
          }
        )
      }
    }

    this.setState({
      bookedProperties: bookedProperties,
      loading: false,
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
              <h2>My Properties</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>You have no properties.</p>
            </div>
          </div>
        </React.Fragment>
      )
    }

    if (bookedProperties.length > 0) {
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
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={property.id}>
                  <div className="card w-75">
                    <div className="card-body">
                      <h5 className="card-title">{property.title}</h5>
                      <p className="card-text"><b>Booked By:</b> {property.username}</p>
                      <p className="card-text"><b>Their Total:</b> ${property.total_price}</p>
                      <p className="card-text">Price per night: ${property.price_per_night}</p>
                      <p className="card-text">Start Date: {property.start_date}</p>
                      <p className="card-text">End Date: {property.end_date}</p>
                      <p className="card-text">Days: {property.days}</p>                   
                      <p className="card-text">Paid: {property.is_paid ? 'Yes' : 'No'}</p>
                      <a href={`/property/${property.property_id}`} className="btn btn-sm btn-primary mt-auto">View Property</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="row">
            <div className="col-12">
              <h2>My Properties</h2>
            </div>
          </div>
          <div className="row">
            {properties.map(property => {
              return (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={property.id}>
                  <div className="card w-75">
                    <div className="card-body">
                      <h5 className="card-title">{property.title}</h5>
                      <p className="card-text">Price per night: ${property.price_per_night}</p>
                      <a href={`/property/${property.id}`} className="btn btn-sm btn-primary mt-auto">View Property</a>
                      <a href={`/properties/${property.id}`} className="btn btn-sm btn-outline-info mt-auto ms-3">Edit Property</a>
                    </div>
                  </div>
                </div>
              )
            })}
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
          <div className="col-12">
            <p>You have no Booked Properties right now.</p>
          </div>
        </div>        
        <div className="row">
          <div className="col-12">
            <h2>My Properties</h2>
          </div>
        </div>
        <div className="row">
          {properties.map(property => {
            return (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={property.id}>
                <div className="card w-75">
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">Price per night: ${property.price_per_night}</p>
                    <a href={`/property/${property.id}`} className="btn btn-sm btn-primary mt-auto">View Property</a>
                    <a href={`/properties/${property.id}`} className="btn btn-sm btn-outline-info mt-auto ms-3">Edit Property</a>
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