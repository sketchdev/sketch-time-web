import React, { Component } from 'react';
import AuthHelper from '../services/AuthHelper';
import ApiHelper from '../services/ApiHelper';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ProfilePic from '../components/ProfilePic';
import Button from '../components/Button';

class UserProfile extends Component {
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

  render() {
    if (this.state.loading) {
      return <Loading/>;
    }
    
    if (this.state.error) {
      return <Error detail={this.state.error}/>
    }
    
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <div>
            <ProfilePic className={'mr3'} size={'large'} email={this.state.user.email}/>
            <div className={'inline-block ml2 align-middle'}>
              <h2 className={'m0 mb1 p0'}>{this.state.user.firstName} {this.state.user.lastName}</h2>
              <p className={'m0 p0'}>{this.state.user.email}</p>
            </div>
          </div>
          <div className={'mt3'}>
            <Button color={'lightgray'} className={'mr1'} to={'/profile/edit'}>Edit Profile</Button>
            <Button color={'lightgray'}>Change Password</Button>
          </div>
        </div>
      </div>
    );
  }

}

UserProfile.propTypes = {};

export default UserProfile;
