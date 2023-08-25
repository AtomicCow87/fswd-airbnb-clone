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
        this.setState({
          properties: data.properties,
        })
      })
      .then(() => {
        if (this.state.properties.length > 0) {
          this.getPropertyBookings();
        }
      })
      .then(() => {
        setTimeout(() => {
          this.blend();
        } , 1000)
      })
  }

  getPropertyBookings = () => {
    const { properties } = this.state;

    for (let i = 0; i < properties.length; i++) {
      fetch(`/api/user/${properties.id}/bookings`)
        .then(handleErrors)
        .then(data => {
          this.setState({
            bookings: this.state.bookings.concat(data.bookings),
          })
        })
    }
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

  render() {
    const { bookedProperties, loading } = this.state;

    if (loading) {
      return <p>loading...</p>;
    };

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
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">Start Date: {property.start_date}</p>
                    <p className="card-text">End Date: {property.end_date}</p>
                    <p className="card-text">Price per night: ${property.price_per_night}</p>
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