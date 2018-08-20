import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { withRouter } from 'react-router';
import ProfilePic from './ProfilePic';
import PropTypes from 'prop-types';

class Header extends Component {

  render() {
    return (
      <StyledDiv>
        <ProfilePic email={this.props.user.email}/>
        <div className={'inline-block mr1 align-middle'}>{this.props.user.email}</div>
        <ButtonGroup>
          <Button color={'white'} onClick={this.props.onLogout}>Logout</Button>
        </ButtonGroup>
      </StyledDiv>
    );
  }
  
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const StyledDiv = styled.div`
    padding-left: 220px;
    padding-right: var(--space-1);
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
    background-color: var(--lightgray);
`;

const ButtonGroup = styled.div`
  display: inline-block;
  float: right;
  & :first-child {
    margin-right: var(--space-1);
  }
`;

export default withRouter(Header);
