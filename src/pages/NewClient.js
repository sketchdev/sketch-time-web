import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import FormHelper from '../services/FormHelper'

class NewClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = FormHelper.handleChanger(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    if (this.validate()) {
      ApiHelper.post('/client', {
        name: this.state.name,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }).then(response => {
        if (response.errors) {
          if (response.clientError) {
            //TODO: Handle Errors
          }
        } else {
          this.props.history.push('/clients')
        }
      }, (err) => {
        console.log(err);
      });
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
        <div><h1>New Client</h1></div>
        <form>
          <div className="container">
            <input onChange={this.handleChange} type="text" placeholder="Name" id="name" required/>
            <input onChange={this.handleChange} type="text" placeholder="Address" id="address" />
            <input onChange={this.handleChange} type="text" placeholder="City" id="city" />
            <input onChange={this.handleChange} type="text" placeholder="State" id="state" />
            <input onChange={this.handleChange} type="text" placeholder="Zip" id="zip" />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewClient;