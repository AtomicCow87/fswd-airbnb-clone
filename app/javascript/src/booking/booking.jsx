import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './booking.scss';

class Booking extends React.Component {
  state = {
    authenticated: false,
    username: null,
    user_id: null,
    properties: [],
  }


  render() {

    return (
      <div>
        <p>Booking</p>
      </div>
    );
  }

}

export default Booking;