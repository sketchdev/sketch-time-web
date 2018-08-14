import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const AppRoute = ({ component: Component, layout: Layout,  ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
);

AppRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
  handleAuthentication: PropTypes.func
};

export default AppRoute;