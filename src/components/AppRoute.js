import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import AuthHelper from '../services/AuthHelper';

const minSessionMinutes = 2;

export default function appRoute(Layout, requiresAuth=false) {
  
  return (WrappedComponent) => {
    class AppRoute extends React.Component {
      componentWillMount() {
        if (requiresAuth && !AuthHelper.isSessionValidForMinutes(minSessionMinutes)) {
          this.props.userContext.clearSession();
        }
      }

      render() {
        if (requiresAuth && !AuthHelper.isSessionValidForMinutes(minSessionMinutes)) {
          console.log('redirecting to login');
          return <Redirect to={'/'}/>;
        }

        return (
          <Layout userContext={this.props.userContext}>
            <WrappedComponent {...this.props}/>
          </Layout>
        );
      }
    }
    
    AppRoute.propTypes = {
      userContext: PropTypes.object.isRequired,
    };

    return AppRoute;
  }
}
