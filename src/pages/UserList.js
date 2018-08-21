import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiHelper from '../services/ApiHelper'
import Table from '../components/Table'

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    };
  }

  componentDidMount() {
    ApiHelper.get('/user')
      .then(response => {
        this.setState({
          people: response.data
        })
      }, (err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div style={{marginTop: '20px'}}>
          <h1 className={'pull-left'}>Users</h1>
          <Link to={'/users/new'}><button className={'btn-small pull-right'}>New User</button></Link>
        </div>
        <Table
          headers={[
            {title: 'First Name', field: 'firstName'},
            {title: 'Last Name', field: 'lastName'},
            {title: 'Email', field: 'email'},
          ]}
          list={this.state.people}
        />
      </div>
    );
  }
}

export default appRoute(MemberLayout, true)(UserList);