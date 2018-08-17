import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import AuthHelper from '../services/AuthHelper';

const AppRoute = ({ component: Component, layout: Layout, requiresAuth, ...rest }) => (
  <Route {...rest} render={props => {
    if (!requiresAuth || AuthHelper.isSessionValidForMinutes(2)) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
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
  handleAuthentication: PropTypes.func
};

export default AppRoute;