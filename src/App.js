import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
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

class App extends Component {
  render() {
    return (
      <Switch>
        <AppRoute path='/dashboard' layout={MemberLayout} component={Dashboard}/>
        <AppRoute path='/users/projects' layout={MemberLayout} component={UserProjectList}/>
        <AppRoute path='/users/new' layout={MemberLayout} component={NewUser}/>
        <AppRoute path='/users' layout={MemberLayout} component={UserList}/>
        <AppRoute path='/projects/new' layout={MemberLayout} component={NewProject}/>
        <AppRoute path='/projects' layout={MemberLayout} component={ProjectList}/>
        <AppRoute path='/clients/new' layout={MemberLayout} component={NewClient}/>
        <AppRoute path='/clients' layout={MemberLayout} component={ClientList}/>
        <AppRoute path='/enter-time/:year/:week' layout={MemberLayout} component={EnterTime}/>
        <Route path={'/'} component={Home}/>
      </Switch>
    );
  }
}

export default App;
