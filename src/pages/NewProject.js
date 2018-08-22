import appRoute from '../components/AppRoute';
import MemberLayout from '../layouts/MemberLayout';
import React, { Component } from 'react';
import FormHelper from '../services/FormHelper';
import ApiHelper from '../services/ApiHelper'
import styled from 'styled-components'
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Select from 'react-select';

class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      isEditing: !!this.props.match.params.id,
      name: '',
      startDate: '',
      endDate: '',
      clientId: '',
      code: '',
      description: '',
      errors: {},
      clientOptions: []
    };

    this.handleChange = FormHelper.handleChanger(this);
  }

  async componentDidMount() {
    let clientOptions = await ApiHelper.get('/client')
      .then(response => {
        if (response.data) {
          return response.data.map(d => {
            return { value: d.id, label: d.name };
          })
        }
      })

    if (this.state.isEditing) {
      let project = await ApiHelper.get('/project/' + this.state.id)
        .then(response => {
          return response.data;
        })
      this.setState({
        clientOptions,
        name: project.name,
        startdate: project.startdate,
        endDate: project.endDate,
        clientId: project.clientId,
        code: project.code,
        descripton: project.description
      });
    } else {
      this.setState({clientOptions});
    }

    console.log('state', this.state)
  }

  handleSubmit = async () => {
    if (this.validate()) {
      const data = {
        name: this.state.name,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        clientId: this.state.clientId,
        code: this.state.code,
        description: this.state.description
      };

      let res;
      if (this.state.isEditing) {
        res = await ApiHelper.put('/project/' + this.state.id, data);
      } else {
        res = await ApiHelper.post('/project', data)
      }

      if (res.errors) {
        this.setState({ serverErrors: res.errors });
      } else {
        this.props.history.push('/projects')
      }
    }
  }

  handleSelect = (selected) => {
    this.setState({
      clientId: selected.value
    });
  }

  validate() {
    let errors = {};
    if (this.state.name === '') {
      errors.name = 'This is required field';
    }
    let dateRegex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    if (this.state.startDate && !dateRegex.test(this.state.startDate)){
      errors.startDate = 'Invalid date format';
    }
    if (this.state.endDate && !dateRegex.test(this.state.endDate)){
      errors.endDate = 'Invalid date format';
    }
    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  }

  render() {
    return (
      <div>
        <div><h1>New Project</h1></div>
        <div className="container">
          <FormInput
            onChange={this.handleChange}
            type="text"
            placeholder="Name"
            name="name"
            error={!!this.state.errors.name}
            help={this.state.errors.name}
            value={this.state.name}/>
          <FormInput
            onChange={this.handleChange}
            type="text"
            placeholder="Start Date"
            name="startDate"
            help={'MM/DD/YYYY'}
            error={!!this.state.errors.startDate}
            value={this.state.startDate}/>
          <FormInput
            onChange={this.handleChange}
            type="text"
            placeholder="End Date"
            name="endDate"
            help={'MM/DD/YYYY'}
            value={this.state.endDate}
            error={!!this.state.errors.endDate}/>
          <SelectInput
            options={this.state.clientOptions}
            onChange={this.handleSelect}
            placeholder="Client"
            value={this.state.clientId ? this.state.clientOptions.find(co => { return co.value === this.state.clientId }) : ''}
          />
          <FormInput
            onChange={this.handleChange}
            type="text"
            placeholder="Code"
            value={this.state.code}
            name="code" />
          <FormInput
            onChange={this.handleChange}
            type="text"
            placeholder="Description"
            value={this.state.description}
            name="description" />

          <ButtonGroup>
            <Button color={'lightgray'} onClick={this.props.history.goBack}>Cancel</Button>
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

const SelectInput = styled(Select)`
    padding-bottom: 10px;
    
  & input {
    margin: 0;
  }
  
`;


export default appRoute(MemberLayout, true)(NewProject);