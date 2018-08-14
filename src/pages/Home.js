import React, { Component } from 'react';
import styled from 'styled-components';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <Main>
        <Header>
          <img height={'50px'} width={'50px'} className={'pull-left'} src={require('../images/sketchTime.jpg')} alt={'Sketch-Time'}/>
          <Title>Sketch-Time</Title>
        </Header>
        <Body>
          <form onSubmit={this.handleSubmit}>
            <Login>
              Log In
            </Login>
            <input id={'email'} type={'text'} placeholder={'Email Address'}/>
            <input id={'password'} type={'password'} placeholder={'Password'}/>
            <button>Log In</button>
          </form>
        </Body>
      </Main>
    );
  }
}

const Main = styled.div`
  text-align: center;
  padding: 0;
  margin: 0;
  height: 100%;
`;

const Header = styled.div`
  font-size: 20px;
  margin: 35px auto;
  width: 250px;
`;

const Title = styled.p`
  padding-top: 5px;
`;

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
  color: var(--warm-gray);
  margin: 0 auto 45px;
  font-size: 35px;
`
export default Home;