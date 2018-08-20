import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import {FaSyncAlt} from 'react-icons/fa'

class Error extends Component {

  render() {
    return (
      <div className={'error center'}>
        <h2>{this.props.message}</h2>
        <p>{this.props.detail}</p>
        <Button className={'mt2'} onClick={this.retry}><FaSyncAlt /> Retry</Button>
      </div>
    );
  }
  
  retry = () => {
    window.location.reload();
  }

}

Error.propTypes = {
  message: PropTypes.string,
  detail: PropTypes.string,
};

Error.defaultProps = {
  message: 'Something went wrong',
  detail: ''
};

export default Error;
