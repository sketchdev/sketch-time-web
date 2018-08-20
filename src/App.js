import React, { Component } from 'react';
import { Switch } from 'react-router';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import UserList from './pages/UserList'
import MemberLayout from './layouts/MemberLayout'
import AppRoute from '../src/components/AppRoute';
import ProjectList from './pages/ProjectList'
import NewUser from './pages/NewUser';
import NewProject from './pages/NewProject';
import NewClient from './pages/NewClient';
import ClientList from './pages/ClientList'
import EnterTime from './pages/EnterTime'
import UserProjectList from './pages/UserProjectList'
import Register from './pages/Register';
import LoginLayout from './layouts/LoginLayout';
import UserProfile from './pages/UserProfile';

class App extends Component {
  render() {
    return (
      <Switch>
        <AppRoute path='/dashboard' layout={MemberLayout} component={Dashboard} requiresAuth />
        <AppRoute path='/users/projects' layout={MemberLayout} component={UserProjectList} requiresAuth/>
        <AppRoute path='/users/new' layout={MemberLayout} component={NewUser} requiresAuth/>
        <AppRoute path='/users' exact layout={MemberLayout} component={UserList} requiresAuth/>
        <AppRoute path='/profile' layout={MemberLayout} component={UserProfile} requiresAuth/>
        <AppRoute path='/projects/new' layout={MemberLayout} component={NewProject} requiresAuth/>
        <AppRoute path='/projects' layout={MemberLayout} component={ProjectList} requiresAuth/>
        <AppRoute path='/clients/new' layout={MemberLayout} component={NewClient} requiresAuth/>
        <AppRoute path='/clients' layout={MemberLayout} component={ClientList} requiresAuth/>
        <AppRoute path='/enter-time/:year/:week' layout={MemberLayout} component={EnterTime} requiresAuth/>
        <AppRoute path='/register' layout={LoginLayout} component={Register}/>
        <AppRoute path={'/'} layout={LoginLayout} component={Home}/>
      </Switch>
    );
  }
}

export default App;
