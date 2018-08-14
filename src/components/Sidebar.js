import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

class Sidebar extends Component {
  render() {
    return (
      <SideNav>
        <div className={'header'}>
          <img height={'30px'} width={'30px'} className={'pull-left'} src={require('../images/sketchTime.jpg')} alt={'Sketch-Time'}/>
          <p className={'title'}>Sketch-Time</p>
        </div>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
        <NavLink to={'/person/list'}>People</NavLink>
        <NavLink to={'/project/list'}>Projects</NavLink>
        <NavLink to={'/client/list'}>Clients</NavLink>
        <NavLink to={'/settings'}>Settings</NavLink>
      </SideNav>
    );
  }
}

const SideNav = styled.div`
    text-align: center;
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: var(--glacier-blue);
    overflow-x: hidden;
    padding-top: 25px;
    
    & a {
      padding: 15px 8px 10px 16px;
      text-decoration: none;
      font-size: 25px;
      color: var(--ice);
      display: block;
      & :hover {
        color: LightGray;
      }
    }
    
    & .header {
      padding: 0 0 0 5px;
      margin: 10px;
      font-size: 25px;
      color: var(--overcast);
      border-bottom: 2px solid var(--overcast);
    }
    
    & .title {
      padding-top: 2px;
    }
`;

export default Sidebar;