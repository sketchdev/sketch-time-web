import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import Header from '../components/Header';
import PropTypes from 'prop-types';

class MemberLayout extends Component {
  render() {
    return (
      <div>
        <Sidebar/>
        {this.props.user && <Header user={this.props.user} onLogout={this.props.setUser}/>}
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

MemberLayout.propTypes = {
  user: PropTypes.object,
};

export default MemberLayout;