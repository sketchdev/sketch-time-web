import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormHelper from '../services/FormHelper';
import ApiHelper from '../services/ApiHelper';
import ServerErrors from './ServerErrors';
import Button from './Button';
import FormInput from './FormInput';

class UserForm extends Component {
  constructor(props) {
    super(props);
    
    const user = props.user || {};
    this.state = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      password: '',
      errors: {},
      serverErrors: {}
    };

    this.handleChange = FormHelper.handleChanger(this);
  }


  render() {
    const newUser = !this.props.user;
    return (
      <div>
        {this.state.serverErrors && <ServerErrors errors={this.state.serverErrors} />}
        <form onSubmit={this.handleSubmit}>
            <FormInput onChange={this.handleChange} placeholder={'First Name'} name={'firstName'} help={this.state.errors.firstName} error={!!this.state.errors.firstName} value={this.state.firstName}/>
            <FormInput onChange={this.handleChange} placeholder={'Last Name'} name={'lastName'} help={this.state.errors.lastName} error={!!this.state.errors.lastName} value={this.state.lastName}/>
            <FormInput onChange={this.handleChange} placeholder={'Email'} name={'email'} help={this.state.errors.email} error={!!this.state.errors.email} value={this.state.email}/>
            {newUser && <FormInput onChange={this.handleChange} type={'password'} placeholder={'Password'} name={'password'} help={this.state.errors.password} error={!!this.state.errors.password} value={this.state.password}/>}
            <Button type="button" color={'lightgray'} onClick={this.props.onCancel} className={'mr2'}>Cancel</Button>
            <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
  
  validate = () => {
    let errors = {};
    if (this.state.firstName === '') {
      errors.firstName = 'This is a required field'
    }
    if (this.state.lastName === '') {
      errors.lastName = 'This is a required field'
    }
    if (this.state.email === '') {
      errors.email = 'This is a required field'
    }
    if (!this.props.user && this.state.password === '') {
      errors.password = 'This is a required field'
    }

    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  };
  
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validate()) {
      const data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      };
      
      let res;
      if (!this.props.user) {
        data.password = this.state.password;
        res = await ApiHelper.post('/user', data);
      } else {
        if (this.props.user.email === this.state.email) {
          delete data.email;
        }
        res = await ApiHelper.patch(`/user/${this.props.user.id}`, data);
      }
      
      if (res.errors) {
        this.setState({ serverErrors: res.errors });
      } else {
        this.props.onSave({...res.data, password: this.state.password});
      }
    }
  };

}

UserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default UserForm;
