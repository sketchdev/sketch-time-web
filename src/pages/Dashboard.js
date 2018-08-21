import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MemberLayout from '../layouts/MemberLayout';
import appRoute from '../components/AppRoute';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        <Link to={`/enter-time/${moment().year()}/${moment().week()}`}>
          <button className={'btn-small pull-right'}>Enter Time</button>
        </Link>
      </div>
    );
  }
}

export default appRoute(MemberLayout, true)(Dashboard);