import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServerErrors extends Component {

  render() {
    let errorMessages = [];
    for (const [k, v] of Object.entries(this.props.errors)) {
      if (k === 'base') {
        errorMessages = errorMessages.concat(v.messages);
      } else {
        errorMessages = errorMessages.concat(v.messages.map(m => `${k} - ${m}`));
      }
    }
    return (
      <div className={'error mb2'}>
        {errorMessages.map((m, i) => (
          <p className={'m0 p0 mb1'} key={i}>{m}</p>
        ))}
      </div>
    );
  }

}

ServerErrors.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default ServerErrors;
