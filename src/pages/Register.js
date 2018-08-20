import React, { Component } from 'react';
import styled from 'styled-components';
import ApiHelper from '../services/ApiHelper';
import AuthHelper from '../services/AuthHelper';
import UserForm from '../components/UserForm';

class Register extends Component {
  
  handleSave = async (user) => {
    const res = await ApiHelper.post('/user/login', {email: user.email, password: user.password});
    if (res.errors) {
      this.props.history.push('/');
    } else {
      AuthHelper.storeToken(res.data.token);
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <Body>
        <Header>Sign Up</Header>
        <UserForm onSave={this.handleSave} onCancel={() => this.props.history.push('/')}/>
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
