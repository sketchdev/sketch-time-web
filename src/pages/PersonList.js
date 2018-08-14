import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiHelper from '../services/ApiHelper'
import Table from '../components/Table'

class PersonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    };
  }

  componentDidMount() {
    ApiHelper.get('/person')
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
          <h1 className={'pull-left'}>People</h1>
          <button className={'btn-small pull-right'}>
            <Link to={'/person/new'}>New Person</Link>
          </button>
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

export default PersonList;