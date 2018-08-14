import React, { Component } from 'react';
import FormHelper from '../services/FormHelper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import ApiHelper from '../services/ApiHelper'
import Moment from 'react-moment';
import moment from 'moment';

class EnterTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      year: '',
      week: '',
      hours: [],
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWeekChangeUp = this.handleWeekChangeUp.bind(this);
    this.handleWeekChangeDown = this.handleWeekChangeDown.bind(this);
  }

  componentDidMount() {
    ApiHelper.get('/project')
      .then(response => {
        this.setState({
          projects: response.data
        })
      }, (err) => {
        console.log(err);
      });
    ApiHelper.get('/hour')
      .then(response => {
        this.setState({
          hours: response.data
        })
      }, (err) => {
        console.log(err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // ApiHelper.post('/person', {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   email: this.state.email
    // })
  }

  handleWeekChangeUp(e) {
    e.preventDefault();
    if (this.state.week === 52) {
      this.setState((prevState, props) => ({
        year: (prevState.year ? prevState.year : moment().year()) + 1,
        week: 1
      }));
    } else {
      this.setState((prevState, props) => ({
        week: (prevState.week ? prevState.week : moment().week()) + 1
      }));
    }
  }

  handleWeekChangeDown(e) {
    e.preventDefault();
    if (this.state.week === 1) {
      this.setState((prevState, props) => ({
        year: (prevState.year ? prevState.year : moment().year()) - 1,
        week: 52
      }));
    } else {
      this.setState((prevState, props) => ({
        week: (prevState.week ? prevState.week : moment().week()) - 1
      }));
    }
  }

  render() {
    const week = this.state.week || moment().week();
    const year = this.state.year || moment().year();
    const startDate = moment().year(year).week(week).day(0);
    const endDate = moment().year(year).week(week).day(6);

    return (
      <div>
        <form>
          <Container>
            <div>
              <button onClick={this.handleWeekChangeDown}><FaChevronLeft/></button>
            </div>
            <div className={'week'}>
              <Moment format={'MMMM DD'}>{startDate}</Moment> -
              <Moment format={'MMMM DD, YYYY'}>{endDate}</Moment>
            </div>
            <div>
              <button onClick={this.handleWeekChangeUp}><FaChevronRight/></button>
            </div>
          </Container>

          <TimeDiv>
            <thead>
              <tr className={'header'}>
                <th>Total</th>
                <th><div>Sun</div><div>0:00</div></th>
                <th><div>Mon</div><div>0:00</div></th>
                <th><div>Tue</div><div>0:00</div></th>
                <th><div>Wed</div><div>0:00</div></th>
                <th><div>Thu</div><div>0:00</div></th>
                <th><div>Fri</div><div>0:00</div></th>
                <th><div>Sat</div><div>0:00</div></th>
                <th><div>Week</div><div>0:00</div></th>
              </tr>
            </thead>
              <tbody>
              {
                this.state.hours.length > 0 && this.state.hours.map(h => {
                  return <tr>
                    <td>{h.name}</td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.sun}/></td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.mon}/></td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.tue}/></td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.wed}/></td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.thur}/></td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.fri}/></td>
                    <td><StyledInput type="text" placeholder="0:00" value={h.sat}/></td>
                    <td/>
                  </tr>
                })
              }
            </tbody>
          </TimeDiv>

          <AddRowContainer className={'addRowContainer'}>
            <div className={'select'}>
              <select className={'select'}>
                <option value="">Choose a Project...</option>
                { this.state.projects.map((p, i) => {
                  return <option key={i} value={p.name}>{p.name}</option>
                })}
              </select>
            </div>
            <div className={'button'}>
              <button className={'btn-small'}>Add Row</button>
            </div>
          </AddRowContainer>

          <div>
            <button className={'btn-small pull-right'}>Save</button>
          </div>

        </form>
      </div>
    );
  }
}


const Container = styled.div`
  display: flex;
  margin-top: 20px;
  
  & .week {
    flex-grow: 1;
    text-align: center;
    align-self: center;
  }
`

const TimeDiv = styled.table`  
  border-collapse: collapse;
  margin-top: 20px;
  width: 100%;
  border: 1px solid #dddddd;

  & .header {
    background-color: var(--glacier-blue);
    color: var(--overcast);
    
    & th {
      padding: 10px;
      text-transform: uppercase;
    }
  }

  & td {
    text-align: center;
    white-space: nowrap;
    padding: 10px;
  }

  & tr:nth-child(even) {
    background-color: var(--overcast);
  }
`;

const StyledInput = styled.input`
    border: 2px solid #e7e7e7;
    display: block;
    border-radius: 3px;
    font-size: 14px;
    padding: 5px;
    margin: 0;
    box-sizing : border-box;
    text-align: center;
`

const AddRowContainer = styled.div`
  display: flex;
  padding: 10px;
  
  & .select {
    padding: 10px;
  }
`;

export default EnterTime;