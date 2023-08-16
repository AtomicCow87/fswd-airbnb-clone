import React from 'react'
import Layout from '@src/layout'
import { safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

import './new_property.scss';

class NewProperty extends React.Component {
  state = {
    authenticated: false,
    property: {
      title: '',
      city: '',
      description: '',
      country: '',
      property_type: '',
      price_per_night: 0,
      max_guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      image_url: [],
    },
    errors: [],
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      property: {
        ...prevState.property,
        [name]: value,
      }
    }));
  }

  handleImageChange = (e) => {
    const { name, files } = e.target;
    console.log(name);
    console.log(files);
    console.log(this.state.property.image_url);
    this.setState({
      property: {
        [name]: files,
      }
    });
    console.log(this.state.property.image_url);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    for (let i = 0; i < formFileMultiple.files.length; i++) {
      formData.append('property[image_url][]', formFileMultiple.files[i]);
    }
    // Set other params in the form data.
    formData.set('property[title]', this.state.property.title);
    formData.set('property[city]', this.state.property.city);
    formData.set('property[description]', this.state.property.description);
    formData.set('property[country]', this.state.property.country);
    formData.set('property[property_type]', this.state.property.property_type);
    formData.set('property[price_per_night]', this.state.property.price_per_night);
    formData.set('property[max_guests]', this.state.property.max_guests);
    formData.set('property[bedrooms]', this.state.property.bedrooms);
    formData.set('property[beds]', this.state.property.beds);
    formData.set('property[baths]', this.state.property.baths);

    fetch('/api/properties', safeCredentialsForm({
      method: 'POST',
      body: formData,
    }))
      .then(response => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.property) {
          //window.location.href = (`/property/${data.property.id}`);
        }
      })
      .catch(error => {
        error.then((messages) => {
          let errorObj = messages.error;
          let errorList = [];

          for (let key in errorObj) {
            errorList.push(`${key}: ${errorObj[key]}`);
          }

          this.setState({
            errors: errorList,
          })
        });
      })
  }

  render () {
    const { authenticated, property, errors } = this.state;
    
    if (!authenticated) {
      return (
        <div className="border p-5 my-5 text-center">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
        </div>
      );
    };

    return (
      <Layout auth={authenticated}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="title"
                      name="title"
                      type="text"
                      value={property.title}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="city"
                      name="city"
                      type="text"
                      value={property.city}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="description"
                      name="description"
                      type="text"
                      value={property.description}
                      onChange={this.handleChange}
                      required
                    />
                  </div>                
                  <div className="form-group">
                    <label htmlFor="country">Country <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="country"
                      name="country"
                      type="text"
                      value={property.country}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="property_type">Property Type <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="property_type"
                      name="property_type"
                      type="text"
                      value={property.property_type}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price_per_night">Price Per Night <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="price_per_night"
                      name="price_per_night"
                      type="number"
                      value={property.price_per_night}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="max_guests">Max Guests <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="max_guests"
                      name="max_guests"
                      type="number"
                      value={property.max_guests}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bedrooms">Bedrooms <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      value={property.bedrooms}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="beds">Beds <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="beds"
                      name="beds"
                      type="number"
                      value={property.beds}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="baths">Baths <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="baths"
                      name="baths"
                      type="number"
                      value={property.baths}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image Upload  <small className="text-danger">*</small></label>
                    <input
                      className="form-control"
                      id="formFileMultiple"
                      name="image_url"
                      type="file"
                      onChange={this.handleImageChange}
                      multiple
                    />
                  </div>
                  <p className="text-danger my-3">* Required</p>
                  <button type="submit" className="btn btn-danger rounded-pill mt-3">
                    Create Property
                  </button>
                  {errors.length > 0 && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <h4 className="alert-heading">There was an error creating your property</h4>
                      {errors.map((error) => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NewProperty;