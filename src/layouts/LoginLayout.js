import React, { Component } from 'react';
import styled from 'styled-components';
import clock from '../images/clock.png';

class LoginLayout extends Component {

  render() {
    return (
      <Main>
        <Header>
          <img height={'60px'} width={'60px'} className={'pull-left'} src={clock} alt={'SketchTime'}/>
          <Title>SketchTime</Title>
        </Header>
        <div>{this.props.children}</div>
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
  width: 275px;
`;

const Title = styled.h1`
  padding-top: 5px;
`;

export default LoginLayout;
