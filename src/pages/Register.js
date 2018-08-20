import React, { Component } from 'react';
import styled from 'styled-components';
import FormHelper from '../services/FormHelper';
import ApiHelper from '../services/ApiHelper';
import AuthHelper from '../services/AuthHelper';
import Button from '../components/Button';

class Register extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {}
    };

    this.handleChange = FormHelper.handleChanger(this);
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    if (this.validate()) {
      // TODO: error handling for this POST
      await ApiHelper.post('/user', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      });
      
      const res = await ApiHelper.post('/user/login', {email: this.state.email, password: this.state.password});
      if (res.errors) {
        this.props.history.push('/');
      } else {
        AuthHelper.storeToken(res.data.token);
        this.props.history.push('/dashboard');
      }
    }
  };

  validate = () => {
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
  };
  
  render() {
    return (
      <Body>
        <Header>Sign Up</Header>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <input onChange={this.handleChange} type="text" placeholder="First Name" name="firstName" id="firstName" required/>
            <input onChange={this.handleChange} type="text" placeholder="Last Name" name="lastName" id="lastName" required/>
            <input onChange={this.handleChange} type="text" placeholder="Email" name="email" id="email" required/>
            <input onChange={this.handleChange} type="password" placeholder="Password" name="password" id="password" required/>
            <Button block type="submit">Submit</Button>
          </div>
        </form>
      </Body>
    );
  }

}

const Body = styled.div`
  margin: 0 auto;
  width: 400px;
  padding: 40px;
  border-radius: 3px;
  background: white;
  border: 2px solid LightGray;
  text-align: center;
`;

const Header = styled.div`
  font-weight: 300;
  margin: 0 auto 45px;
  font-size: 35px;
`;

export default Register;
