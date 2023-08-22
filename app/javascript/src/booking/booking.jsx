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
        <p>Temp booking page</p>
      </div>
    );
  }

}

export default Booking;