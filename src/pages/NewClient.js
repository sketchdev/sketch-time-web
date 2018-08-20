import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import FormHelper from '../services/FormHelper'
import InputGroup from '../components/Input'
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = FormHelper.handleChanger(this);
  }

  componentDidMount() {
    if (this.state.isEditing) {
      ApiHelper.get('/client/' + this.state.id)
        .then(response => {
          console.log(response.data)
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

  handleSubmit() {
    if (this.validate()) {
      if (this.state.isEditing) {
        ApiHelper.put('/client/' + this.state.id, {
          name: this.state.name,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip
        }).then(response => {
          if (response.errors) {
            this.setState({
              errors: {base: 'Invalid request. Please try again later.'}
            })
          } else {
            this.props.history.push('/clients')
          }
        }, (err) => {
          console.log('Put error', err);
          this.setState({
            errors: {base: 'Invalid request. Please try again later.'}
          })
        });
      } else {
        ApiHelper.post('/client', {
          name: this.state.name,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip
        }).then(response => {
          if (response.errors) {
            this.setState({
              base: response.errors
            })
          } else {
            this.props.history.push('/clients')
          }
        }, (err) => {
          console.log(err);
          this.setState({
            errors: {base: 'Invalid request. Please try again later.'}
          })
        });
      }
    }
  }

  validate() {
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
            <InputGroup
              type={'text'}
              id={'name'}
              placeholder={'Name'}
              onChange={this.handleChange}
              error={this.state.errors.name}
              value={this.state.name}
            />
            <InputGroup
              type={'text'}
              id={'address'}
              placeholder={'Address'}
              onChange={this.handleChange}
              value={this.state.address}
            />
            <InputGroup
              type={'text'}
              id={'city'}
              placeholder={'City'}
              onChange={this.handleChange}
              value={this.state.city}
            />
            <InputGroup
              type={'text'}
              id={'state'}
              placeholder={'State'}
              onChange={this.handleChange}
              value={this.state.state}
            />
            <InputGroup
              type={'text'}
              id={'zip'}
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

export default NewClient;