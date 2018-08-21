import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import ApiHelper from '../services/ApiHelper'

class DeletePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      type: this.props.location.state.type,
      listPage: this.props.location.state.listPage,
      errors: {}
    };
  }

  handleSubmit = async () => {
    ApiHelper.delete(`/${this.state.type}/${this.state.id}`)
      .then(response => {
        if (response.errors) {
          this.setState({
            errors: {base: 'Invalid request. Please try again later.'}
          })
        } else {
          this.props.history.push(this.state.listPage)
        }
      }, (err) => {
      console.error('Put error', err);
      this.setState({
        errors: {base: 'Invalid request. Please try again later.'}
      })
    });
  };

  render() {
    return (
      <div>
        <Body>
        {this.state.errors.base && <p className={'error'}>{this.state.errors.base}</p>}
        <p>Are you sure you want to delete?</p>
          <ButtonGroup>
            <Button to={this.state.listPage}>No</Button>
            <Button onClick={this.handleSubmit} color={'orange'}>Yes</Button>
          </ButtonGroup>
        </Body>
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

const ButtonGroup = styled.div`
  display: inline-block;
  & :first-child {
    margin-right: var(--space-1);
  }
`;

export default appRoute(MemberLayout, true)(DeletePage);