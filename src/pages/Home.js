import appRoute from '../components/AppRoute';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ApiHelper from '../services/ApiHelper';
import FormHelper from '../services/FormHelper';
import { Redirect } from 'react-router';
import LoginLayout from '../layouts/LoginLayout';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    
    this.handleChange = FormHelper.handleChanger(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await ApiHelper.post('/user/login', {email: this.state.email, password: this.state.password});
    if (res.errors) {
      //TODO can wrestler make it easier to deal with error messages
      this.setState({
        error: (res.errors.base || {}).messages[0] || 'something went wrong'
      });
    } else {
      this.props.userContext.createSession(res.data.token);
      this.props.history.push('/dashboard');
    }
  };

  render() {
    if (this.props.userContext.user) {
      return <Redirect to={'/dashboard'} />;
    }
    
    return (
      <div>
        <Body>
          <form onSubmit={this.handleSubmit}>
            <Login>
              Log In
            </Login>
            {this.state.error && <p className={'error'}>{this.state.error}</p>}
            <input id={'email'} onChange={this.handleChange} type={'text'} placeholder={'Email Address'} value={this.state.email}/>
            <input id={'password'} onChange={this.handleChange} type={'password'} placeholder={'Password'} value={this.state.password}/>
            <button>Log In</button>
          </form>
        </Body>
        <div>
          <p>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
        </div>
      </div>
    );
  }
}

const Body = styled.div`
  margin: 0 auto;
  width: 400px;
  padding: 40px;
  border-radius: 3px;
  background: white;
  border: 2px solid LightGray;
  text-align: center;
`;

const Login = styled.div`
  font-weight: 300;
  margin: 0 auto 45px;
  font-size: 35px;
`;
export default appRoute(LoginLayout)(Home);