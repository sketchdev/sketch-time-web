import React, { Component } from 'react';
import ProfilePic from '../components/ProfilePic';
import Button from '../components/Button';
import PropTypes from 'prop-types';

class UserProfile extends Component {

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <div>
            <ProfilePic className={'mr3'} size={'large'} email={this.props.user.email}/>
            <div className={'inline-block ml2 align-middle'}>
              <h2 className={'m0 mb1 p0'}>{this.props.user.firstName} {this.props.user.lastName}</h2>
              <p className={'m0 p0'}>{this.props.user.email}</p>
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

UserProfile.propTypes = {
  user: PropTypes.object,
};

export default UserProfile;
