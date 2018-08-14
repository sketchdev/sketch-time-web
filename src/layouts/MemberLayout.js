import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

class MemberLayout extends Component {
  render() {
    return (
      <div>
        <Sidebar/>
        <Main>
          { this.props.children }
        </Main>
      </div>
    );
  }
}

const Main = styled.div`
    margin-left: 220px;
    margin-right: 20px;
    width: auto;
`;

export default MemberLayout;