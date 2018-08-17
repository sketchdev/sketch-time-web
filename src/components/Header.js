import React, { Component } from 'react';
import styled from 'styled-components';
import AuthHelper from '../services/AuthHelper';
import Button from './Button';
import { withRouter } from 'react-router';

class Header extends Component {

  render() {
    const user = AuthHelper.currentUser();
    return (
      <StyledDiv>
        <StyledImage src={`https://www.gravatar.com/avatar/${user.gravatarHash}?s=46`} />
        <div className={'inline-block mr1'}>{user.email}</div>
        <ButtonGroup>
          <Button color={'white'} onClick={this.logout}>Logout</Button>
        </ButtonGroup>
      </StyledDiv>
    );
  }
  
  logout = () => {
    AuthHelper.clearSession();
    this.props.history.push('/');
  }

}

Header.propTypes = {};

const StyledDiv = styled.div`
    padding-left: 220px;
    padding-right: var(--space-1);
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
    background-color: var(--lightgray);
`;

const StyledImage = styled.img`
  border-radius: 23px;
  vertical-align: middle;
  margin-right: var(--space-1);
`;

const ButtonGroup = styled.div`
  display: inline-block;
  float: right;
  & :first-child {
    margin-right: var(--space-1);
  }
`;

export default withRouter(Header);
