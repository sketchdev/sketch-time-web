import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AuthHelper from '../services/AuthHelper';
import { Redirect } from 'react-router';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    }
  }

  render() {
    if (this.state.loggedOut) {
      return <Redirect to={'/'} />;
    }
    
    return (
      <SideNav>
        <div className={'header'}>
          <img height={'30px'} width={'30px'} className={'pull-left'} src={require('../images/clockwhite.png')} alt={'Sketch-Time'}/>
          <p className={'title'}>SketchTime</p>
        </div>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
        <NavLink to={'/users'}>Users</NavLink>
        <NavLink to={'/projects'}>Projects</NavLink>
        <NavLink to={'/clients'}>Clients</NavLink>
        <NavLink to={'/settings'}>Settings</NavLink>
        <div className={'user-section'}>
          <p>{AuthHelper.getUser().email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      </SideNav>
    );
  }
  
  logout = () => {
    AuthHelper.logout();
    this.setState({loggedOut: true});
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
    background-color: var(--darkblue);
    overflow-x: hidden;
    padding-top: 25px;
    letter-spacing: 1px;
    
    & a {
      padding: 1rem 1.5rem;
      text-decoration: none;
      font-size: 20px;
      color: var(--orange);
      text-transform: uppercase;
      text-align: right;
      display: block;
      &:hover {
        color: var(--lightblue);
      }
    }
    
    & .header {
      padding: 0 0 0 5px;
      margin: 10px;
      font-size: 25px;
      color: whitesmoke;
      border-bottom: 2px solid whitesmoke;
    }
    
    & .title {
      padding-top: 2px;
    }
    
    & .user-section {
      margin: 10px;
      border-top: 2px solid whitesmoke;
      text-align: center;
      
      & p {
        font-size: .70em;
        color: whitesmoke;
      }
      
      & button {
        color: whitesmoke;
        border: 1px solid whitesmoke;
        padding: .5em;
        width: auto;
        font-size: 1em;
        display: inline-block;
        margin-bottom: 10px;
      }
    }
`;

export default Sidebar;