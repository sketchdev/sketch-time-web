import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import FormHelper from '../services/FormHelper'
import FormInput from '../components/FormInput';
import validator from 'validator';
import Button from '../components/Button';
import styled from 'styled-components';

class NewClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      isEditing: !!this.props.match.params.id,
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      errors: {}
    };

    this.handleChange = FormHelper.handleChanger(this);
  }

  componentDidMount() {
    if (this.state.isEditing) {
      ApiHelper.get('/client/' + this.state.id)
        .then(response => {
          console.log(response.data);
          this.setState({
            name: response.data.name,
            address: response.data.address,
            city: response.data.city,
            state: response.data.state,
            zip: response.data.zip
          })
        })
    }
  }

  handleSubmit = async () => {
    if (this.validate()) {
      const data = {
        name: this.state.name,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      };

      let res;
      if (this.state.isEditing) {
        res = await ApiHelper.put('/client/' + this.state.id, data);
      } else {
        res = await ApiHelper.post('/client', data);
      }

      if (res.errors) {
        this.setState({ serverErrors: res.errors });
      } else {
        this.props.history.push('/clients');
      }
    }
  }

  validate = () => {
    let errors = {};
    if (this.state.name === '') {
      errors.name = 'This is required field'
    }
    if (this.state.zip !== '' && !validator.isPostalCode(this.state.zip, 'US')) {
      errors.zip = 'Invalid Zip'
    }

    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  }

  render() {
    return (
      <div>
        <div><h1>{this.state.isEditing ? 'Edit Client' : 'New Client'}</h1></div>
        {this.state.errors.base && <p className={'error'}>{this.state.errors.base}</p>}
          <div className="container">
            <FormInput
              type={'text'}
              name={'name'}
              placeholder={'Name'}
              onChange={this.handleChange}
              error={!!this.state.errors.name}
              help={this.state.errors.name}
              value={this.state.name}
            />
            <FormInput
              type={'text'}
              name={'address'}
              placeholder={'Address'}
              onChange={this.handleChange}
              value={this.state.address}
            />
            <FormInput
              type={'text'}
              name={'city'}
              placeholder={'City'}
              onChange={this.handleChange}
              value={this.state.city}
            />
            <FormInput
              type={'text'}
              name={'state'}
              placeholder={'State'}
              onChange={this.handleChange}
              value={this.state.state}
            />
            <FormInput
              type={'text'}
              name={'zip'}
              placeholder={'Zip'}
              onChange={this.handleChange}
              error={this.state.errors.zip}
              value={this.state.zip}
            />
            <ButtonGroup>
              <Button style={{marginRight: '.7rem'}} color={'lightgray'} onClick={this.props.history.goBack}>Cancel</Button>
              <Button onClick={this.handleSubmit}>Save</Button>
            </ButtonGroup>
          </div>
      </div>
    );
  }
}

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: inline-block;
  float: right;
  & :first-child {
    margin-right: var(--space-1);
  }
`;

export default appRoute(MemberLayout, true)(NewClient);