import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div style={{marginTop: '20px'}}>
        <button className={'btn-small pull-right'}>
          <Link to={'/enter-time'}>Enter Time</Link>
        </button>
      </div>
    );
  }
}

export default Dashboard;