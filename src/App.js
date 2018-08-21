import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import UserList from './pages/UserList'
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
import UserProfileEdit from './pages/UserProfileEdit';
import DeletePage from './pages/DeletePage'
import AuthHelper from './services/AuthHelper';
import UserContext from './context/UserContext';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userContext: {
        user: AuthHelper.currentUser(),
        updateUser: this.updateUser,
        clearSession: this.clearSession,
        createSession: this.createSession,
      }
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state.userContext}>
        <Switch>
          <Route path='/dashboard' render={(props) => this.withProps(props, Dashboard) } />
          <Route path='/users/projects' render={(props) => this.withProps(props, UserProjectList) }/>
          <Route path='/users/new' render={(props) => this.withProps(props, NewUser) }/>
          <Route path='/users' exact render={(props) => this.withProps(props, UserList) }/>
          <Route path='/profile' exact render={(props) => this.withProps(props, UserProfile) }/>
          <Route path='/profile/edit' exact render={(props) => this.withProps(props, UserProfileEdit) }/>
          <Route path='/projects/new' render={(props) => this.withProps(props, NewProject) }/>
          <Route path='/projects' render={(props) => this.withProps(props, ProjectList) }/>
          <Route exact path='/clients/new' render={(props) => this.withProps(props, NewClient) }/>
          <Route exact path='/clients/delete' render={(props) => this.withProps(props, DeletePage) }/>
          <Route path='/clients/edit/:id' render={(props) => this.withProps(props, NewClient) }/>
          <Route path='/clients' render={(props) => this.withProps(props, ClientList) }/>
          <Route path='/enter-time/:year/:week' render={(props) => this.withProps(props, EnterTime) }/>
          <Route path='/register' layout={LoginLayout} render={(props) => this.withProps(props, Register) }/>
          <Route path={'/'} layout={LoginLayout} render={(props) => this.withProps(props, Home) }/>
        </Switch>
      </UserContext.Provider>
    );
  }
  
  withProps = (props, Component) => {
    return <Component userContext={this.state.userContext} {...props} />
  };
  
  updateUser = (user) => {
    this.setState(prevState => ({
      userContext: {...prevState.userContext, user: user}
    }));
  };
  
  clearSession = () => {
    AuthHelper.clearSession();
    this.setState(prevState => ({
      userContext: {...prevState.userContext, user: null}
    }));
  };
  
  createSession = (token) => {
    const user = AuthHelper.storeToken(token);
    this.setState(prevState => ({
      userContext: {...prevState.userContext, user}
    }));
  };
}

export default App;
