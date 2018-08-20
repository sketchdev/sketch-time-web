import React, { Component } from 'react';
import styled from 'styled-components';
import UserForm from '../components/UserForm';

class UserProfileEdit extends Component {
  
  handleSave = async (user) => {
    this.props.setUser(user);
    this.props.history.push('/profile');
  };
  
  handleCancel = () => {
    this.props.history.push('/profile');
  };

  render() {
    return (
      <Body>
        <h1>Edit Profile</h1>
        <UserForm onSave={this.handleSave} onCancel={this.handleCancel} user={this.props.user}/>
      </Body>
    );
  }

}

const Body = styled.div`
  width: 400px;
`;

export default UserProfileEdit;
