import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import styled from 'styled-components';

class ProfilePic extends PureComponent {

  render() {
    return (
      <StyledImage radius={this.props.size === 'small' ? 23 : 43} src={this.imageSrc()} />
    );
  }
  
  imageSrc = () => {
    const hash = md5(this.props.email.trim().toLowerCase());
    const size = this.props.size === 'small' ? 40 : 90;
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`
  }

}

ProfilePic.propTypes = {
  size: PropTypes.oneOf('small', 'large'),
  email: PropTypes.string.isRequired,
};

ProfilePic.defaultProps = {
  size: 'small'
};

const StyledImage = styled.img`
  border-radius: ${props => props.radius}px;
  margin-right: var(--space-1);
  vertical-align: middle;
`;

export default ProfilePic;
