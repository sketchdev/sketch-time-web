import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import AuthHelper from '../services/AuthHelper';
import UserContext from '../context/UserContext';

const AppRoute = ({ component: Component, layout: Layout, requiresAuth, ...rest }) => (
  <Route {...rest} render={props => {
    if (!requiresAuth || AuthHelper.isSessionValidForMinutes(2)) {
      return (
        <UserContext.Consumer>
          {({user, setUser}) => (
            <Layout user={user} setUser={setUser}>
              <Component {...props} user={user} setUser={setUser} />
            </Layout>
          )}
        </UserContext.Consumer>
      );
    } else {
      AuthHelper.clearSession();
      return <Redirect to={'/'} />
    }
  }} />
);

AppRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};

export default AppRoute;