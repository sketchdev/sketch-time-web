import React, { Component } from 'react';
import styled from 'styled-components';
import UserForm from '../components/UserForm';
import AuthHelper from '../services/AuthHelper';
import ApiHelper from '../services/ApiHelper';
import Loading from '../components/Loading';
import Error from '../components/Error';

class UserProfileEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      error: null
    }
  }

  async componentDidMount() {
    const id = AuthHelper.currentUser().id;
    const res = await ApiHelper.get(`/user/${id}`);
    if (res.errors) {
      this.setState({
        loading: false,
        error: 'unable to lookup the profile data'
      })
    } else {
      this.setState({
        loading: false,
        error: false,
        user: res.data
      })
    }
  }
  
  handleSave = async () => {
    // TODO: if email changed then we should update the user info in the local storage, probably use redux at this point, or Context
    this.props.history.push('/profile');
  };
  
  handleCancel = () => {
    this.props.history.push('/profile');
  };

  render() {
    if (this.state.loading) {
      return <Loading/>;
    }

    if (this.state.error) {
      return <Error detail={this.state.error}/>
    }

    return (
      <Body>
        <h1>Edit Profile</h1>
        <UserForm onSave={this.handleSave} onCancel={this.handleCancel} user={this.state.user}/>
      </Body>
    );
  }

}

const Body = styled.div`
  width: 400px;
`;

export default UserProfileEdit;
