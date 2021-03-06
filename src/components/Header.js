import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { withRouter } from 'react-router';
import ProfilePic from './ProfilePic';

class Header extends Component {

  render() {
    const user = this.props.userContext.user;
    return (
      <StyledDiv>
        <ProfilePic email={user.email}/>
        <div className={'inline-block mr1 align-middle'}>{user.email}</div>
        <ButtonGroup>
          <Button color={'white'} onClick={this.logout}>Logout</Button>
        </ButtonGroup>
      </StyledDiv>
    );
  }
  
  logout = () => {
    this.props.userContext.clearSession();
    this.props.history.push('/');
  };
  
}

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
