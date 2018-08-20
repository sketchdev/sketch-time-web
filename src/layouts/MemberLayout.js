import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import Header from '../components/Header';
import AuthHelper from '../services/AuthHelper';

class MemberLayout extends Component {
  render() {
    const user = AuthHelper.currentUser();
    return (
      <div>
        <Sidebar/>
        {user && <Header />}
        <Main>
          { this.props.children }
        </Main>
      </div>
    );
  }
}

const Main = styled.div`
    margin-left: 220px;
    margin-right: var(--space-2);
    margin-top: var(--space-2);
    width: auto;
`;

export default MemberLayout;