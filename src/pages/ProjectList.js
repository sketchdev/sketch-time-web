import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import Table from '../components/Table'
import { Link } from 'react-router-dom';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  async componentDidMount() {
    let projects = await ApiHelper.get('/project')
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });

    let clients = await ApiHelper.get('/client')
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });

    this.setState({
      projects, clients
    })
  }

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        <h1 className={'pull-left'}>Projects</h1>
        <Link to={'/projects/new'}><button className={'btn-small pull-right'}>New Project</button></Link>
        <Table
          type={'project'}
          listPage={'/projects'}
          data={[
            {title: 'Name', field: 'name'},
            {title: 'Start Date', field: 'startDate'},
            {title: 'End Date', field: 'endDate'},
            {title: 'Client', field: 'clientId', options: this.state.clients},
            {title: 'Code', field: 'code'},
            {title: 'Description', field: 'description'},
          ]}
          list={this.state.projects}
          edit={'/projects/edit/'}
        />
      </div>
    );
  }
}

export default appRoute(MemberLayout, true)(ProjectList);