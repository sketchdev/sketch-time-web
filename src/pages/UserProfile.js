import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import ProfilePic from '../components/ProfilePic';
import Button from '../components/Button';

class UserProfile extends Component {

  render() {
    const user = this.props.userContext.user;
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <div>
            <ProfilePic className={'mr3'} size={'large'} email={user.email}/>
            <div className={'inline-block ml2 align-middle'}>
              <h2 className={'m0 mb1 p0'}>{user.firstName} {user.lastName}</h2>
              <p className={'m0 p0'}>{user.email}</p>
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

export default appRoute(MemberLayout, true)(UserProfile);
