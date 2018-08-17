import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiHelper from '../services/ApiHelper'
import Table from '../components/Table'

class ClientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    ApiHelper.get('/client')
      .then(response => {
        this.setState({
          clients: response.data
        })
      }, (err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div style={{marginTop: '20px'}}>
          <h1 className={'pull-left'}>Clients</h1>
          <Link to={'/clients/new'}><button className={'btn-small pull-right'}>New Client</button></Link>
        </div>
        <Table
          headers={[
            {title: 'Name', field: 'name'},
            {title: 'Address', field: 'address'},
            {title: 'City', field: 'city'},
            {title: 'State', field: 'state'},
            {title: 'Zip', field: 'zip'},
          ]}
          list={this.state.clients}
        />
      </div>
    );
  }
}

export default ClientList;