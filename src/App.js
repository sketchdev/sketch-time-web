import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import PersonList from './pages/PersonList'
import MemberLayout from './layouts/MemberLayout'
import AppRoute from '../src/components/AppRoute';
import ProjectList from './pages/ProjectList'
import NewPerson from './pages/NewPerson';
import NewProject from './pages/NewProject';
import NewClient from './pages/NewClient';
import ClientList from './pages/ClientList'
import EnterTime from './pages/EnterTime'

class App extends Component {
  render() {
    return (
      <Switch>
        <AppRoute path='/dashboard' layout={MemberLayout} component={Dashboard}/>
        <AppRoute path='/person/list' layout={MemberLayout} component={PersonList}/>
        <AppRoute path='/person/new' layout={MemberLayout} component={NewPerson}/>
        <AppRoute path='/project/new' layout={MemberLayout} component={NewProject}/>
        <AppRoute path='/project/list' layout={MemberLayout} component={ProjectList}/>
        <AppRoute path='/client/new' layout={MemberLayout} component={NewClient}/>
        <AppRoute path='/client/list' layout={MemberLayout} component={ClientList}/>
        <AppRoute path='/enter-time' layout={MemberLayout} component={EnterTime}/>
        <Route path={'/'} component={Home}/>
      </Switch>
    );
  }
}

export default App;
