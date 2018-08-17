import React, { Component } from 'react';
import AuthHelper from '../services/AuthHelper';

class UserProfile extends Component {
  render() {
    const user = AuthHelper.currentUser();
    return (
      <div>
        <h1>Profile</h1>
        <div>
          Hello {user.email}
        </div>
      </div>
    );
  }

}

UserProfile.propTypes = {};

export default UserProfile;
