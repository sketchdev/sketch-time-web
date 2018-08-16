import React, { Component } from 'react';
import FormHelper from '../services/FormHelper';
import ApiHelper from '../services/ApiHelper'
import moment from 'moment';

class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      startDate: '',
      endDate: '',
      client: '',
      code: '',
      description: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = FormHelper.handleChanger(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    if (this.validate()) {
      ApiHelper.post('/projects', {
        name: this.state.name,
        startDate: this.state.startDate ? moment(this.state.startDate) : '',
        endDate: this.state.endDate ? moment(this.state.endDate) : '',
        client: this.state.client,
        code: this.state.code,
        description: this.state.description
      })
      this.props.history.push('/projects')
    }
  }

  validate() {
    let errors = {};
    if (this.state.name === '') {
      errors.name = 'This is required field'
    }

    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  }

  render() {
    return (
      <div>
        <div><h1>New Project</h1></div>
        <form>
          <div className="container">
            <input onChange={this.handleChange} type="text" placeholder="Name" id="name" required/>
            <input onChange={this.handleChange} type="text" placeholder="Start Date" id="startDate" />
            <small>MM/DD/YYYY</small>
            <input onChange={this.handleChange} type="text" placeholder="End Date" id="endDate" />
            <small>MM/DD/YYYY</small>
            <input onChange={this.handleChange} type="text" placeholder="Client" id="client" />
            <input onChange={this.handleChange} type="text" placeholder="Code" id="code" />
            <input onChange={this.handleChange} type="text" placeholder="Description" id="description" />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewProject;