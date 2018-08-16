import React, { Component } from 'react';
import FormHelper from '../services/FormHelper'
import ApiHelper from '../services/ApiHelper'

class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = FormHelper.handleChanger(this);
    this.validate = this.validate.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    if (this.validate()) {
      ApiHelper.post('/users', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
      this.props.history.push('/users')
    }
  }

  validate() {
    let errors = {};
    if (this.state.firstName === '') {
      errors.firstName = 'This is required field'
    }
    if (this.state.lastName === '') {
      errors.firstName = 'This is required field'
    }
    if (this.state.email === '') {
      errors.firstName = 'This is required field'
    }

    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  }

  render() {
    return (
      <div>
        <div><h1>New User</h1></div>
        <form>
          <div className="container">
            <input onChange={this.handleChange} type="text" placeholder="First Name" name="firstName" id="firstName" required/>
            <input onChange={this.handleChange} type="text" placeholder="Last Name" name="lastName" id="lastName" required/>
            <input onChange={this.handleChange} type="text" placeholder="Email" name="email" id="email" required/>
            <input onChange={this.handleChange} type="password" placeholder="Password" name="password" id="password" required/>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewUser;