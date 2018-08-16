import React, { Component } from 'react';
import ApiHelper from '../services/ApiHelper'
import StyledTable from '../components/StyledTable';
import { FaPlus, FaCheck } from 'react-icons/fa'
import styled from 'styled-components';

class UserProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 'test',
      id: '',
      projects: [],
      userProjects: [],
      isEditing: ''
    };


    this.addToUserProjects = this.addToUserProjects.bind(this);
    this.removeFromUserProjects = this.removeFromUserProjects.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let projects = await ApiHelper.get('/projects')
      .then(response => {
        return response.data;
      }, (err) => {
        console.log(err);
      });
    let userProjects = await ApiHelper.get('/user_projects?user_id=test')
      .then(response => {
        console.log(response.data)
        return response.data;
      }, (err) => {
        console.log(err);
      });

    if (userProjects && userProjects.length > 0) {
      this.setState({
        projects,
        userProjects: userProjects[0].projects,
        id: userProjects[0].id,
        isEditing: true
      })
    } else {
      this.setState({
        projects,
        userProjects: [],
        isEditing: false
      })
    }
  }

  addToUserProjects(e, projectId) {
    e.preventDefault();
    this.setState((prevState) => ({
      userProjects: [...prevState.userProjects, projectId]
    }));
  }

  removeFromUserProjects(e, projectId) {
    e.preventDefault();
    const index = this.state.userProjects.indexOf(projectId);
    if (index !== -1) {
      this.setState((prevState) => ({
        userProjects: [...prevState.userProjects.slice(0,index), ...prevState.userProjects.slice(index+1)]
      }));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.isEditing) {
      ApiHelper.put('/user_projects/'+this.state.id, {
        user_id: this.state.userId,
        projects: this.state.userProjects
      })
    } else {
      ApiHelper.post('/user_projects', {
        user_id: this.state.userId,
        projects: this.state.userProjects
      })
    }
    this.props.history.push('/enter-time/2018/33')
  }

  render() {
    console.log('state', this.state)
    return (
      <div style={{marginTop: '20px'}}>
        <h1 className={'pull-left'}>My Projects</h1>
        <StyledTable>
          <thead>
            <tr>
              <th/>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
          { this.state.projects && this.state.projects.map((p, index) => {
            return <tr key={index}>
              <td>{ this.state.userProjects.includes(p.id) ?
                <CheckButton onClick={(e) => this.removeFromUserProjects(e, p.id)} className={'btn-small'}><FaCheck/></CheckButton> :
                <PlusButton onClick={(e) => this.addToUserProjects(e, p.id)} className={'btn-small'}><FaPlus/></PlusButton>
                }
              </td>
              <td>{p.name}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
            </tr>;
          })}
          </tbody>
        </StyledTable>
        <button type="submit" onClick={this.handleSubmit}>Save Changes</button>
      </div>
    );
  }
}

const PlusButton = styled.button`
  padding: .2rem .2rem 0 .2rem;
  background-color: white;
  border: 1px solid lightgray;
  
  & svg {
    color: var(--orange)
  }
`;

const CheckButton = PlusButton.extend`  
  & svg {
    color: green;
  }
`;

export default UserProjectList;