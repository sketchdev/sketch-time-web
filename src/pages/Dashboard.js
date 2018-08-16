import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ApiHelper from '../services/ApiHelper'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    ApiHelper.get('/userProjects')
      .then(response => {
        this.setState({
          projects: response.data
        })
      }, (err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        <Link to={`/enter-time/${moment().year()}/${moment().week()}`}>
          <button className={'btn-small pull-right'}>Enter Time</button>
        </Link>

        <div>
          <h5>My Projects</h5>
        </div>
      </div>
    );
  }
}

export default Dashboard;