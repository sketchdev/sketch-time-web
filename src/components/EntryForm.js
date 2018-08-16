import React, { Component } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';

class EntryForm extends Component {
  render() {
    const startDate = moment().year(this.props.data.year).week(this.props.data.week).day(0);
    const endDate = moment().year(this.props.data.year).week(this.props.data.week).day(6);

    return (
      <div>
        <form>
          <Container>
            <div>
              <Link to={getNextWeekLink(this.props.data.week, this.props.data.year, -1)}><button><FaChevronLeft/></button></Link>
            </div>
            <h2 className={'week'}>
              <Moment format={'MMMM DD'}>{startDate}</Moment> - <Moment format={'MMMM DD, YYYY'}>{endDate}</Moment>
            </h2>
            <div>
              <Link to={getNextWeekLink(this.props.data.week, this.props.data.year, 1)}>
                <button><FaChevronRight/></button>
              </Link>
            </div>
          </Container>

          <TimeDiv>
            <thead>
            <tr className={'header'}>
              <th><div className={'big'}>Total</div></th>
              <th><div>Sun</div><div>{this.props.data.sunTotal}</div></th>
              <th><div>Mon</div><div>{this.props.data.monTotal}</div></th>
              <th><div>Tue</div><div>{this.props.data.tueTotal}</div></th>
              <th><div>Wed</div><div>{this.props.data.wedTotal}</div></th>
              <th><div>Thu</div><div>{this.props.data.thuTotal}</div></th>
              <th><div>Fri</div><div>{this.props.data.friTotal}</div></th>
              <th><div>Sat</div><div>{this.props.data.satTotal}</div></th>
              <th><div className={'big'}>Week</div><div className={'big'} style={{paddingTop: '5px'}}>{this.props.data.weekTotal}</div></th>
            </tr>
            </thead>
            <tbody>
            {
              (this.props.data.entries && this.props.data.entries.length > 0) && this.props.data.entries.map((e, entriesIndex) => {
                return <tr key={'entry'+entriesIndex}>
                  <td>
                    {this.props.data.projects.find(p => { return e.project_id === p.id }).name}
                  </td>
                    { e.hours.map((h, hoursIndex) => {
                      return <td key={'day'+hoursIndex}>
                        <input value={h} onChange={(e) => this.props.handleHourChange(e, entriesIndex, hoursIndex)} onBlur={(e) => this.props.handleHourBlur(e, entriesIndex, hoursIndex)} type="text" placeholder="0.0" />
                      </td>
                    })
                    }
                  <td/>
                </tr>
              })
            }
            </tbody>
          </TimeDiv>

          <AddRowContainer>
            <Link to={'/users/projects'}><button className={'btn-small btn-secondary'} onClick={this.props.addProject}>Add Projects</button></Link>
            <button onClick={this.props.handleSubmit} className={'btn-small'}>Save</button>
          </AddRowContainer>
        </form>
      </div>
    );
  }
}

function getNextWeekLink(week, year, value) {
  if (week === '52' && value === 1) {
    return `/enter-time/${Number(year)+1}/1`;
  } else if (week === '1' && value === -1) {
     return `/enter-time/${Number(year)-1}/52`;
  } else {
    return `/enter-time/${year}/${Number(week)+value}`;
  }
}

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  
  & .week {
    flex-grow: 1;
    margin-top: .2rem;
    text-align: center;
    align-self: center;
  }
  
  & button {
    padding: .5rem .5rem .3rem .5rem;
  }
`

const TimeDiv = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  
  & thead > tr {
      border-bottom: 1px solid lightgray;
      text-align: center;
    & th {
      padding: 8px;
      font-size: 0.9em;
      font-weight: 300;
      color: grey;
      text-transform: uppercase;
      
      & div:first-child {
        color: var(--orange);
      }
      & div:nth-child(2) {
        padding-top: .3rem;
      }
    }
    
      & th:first-child {
        font-size: 1.1em;
        text-align: left;
      }
      
      & th:last-child {
        font-size: 1.1em;
        text-align: center;
      }
    
  }
  
  & tr {
    &:nth-child(even) {
     background-color: #ededed;
    }
    
    & input {
      border: 1px solid lightgray;
      border-radius: 3px;
      font-size: .9rem;
      padding: 5px;
      margin: 0;
      text-align: center;
    }
   }
  
  & td {
    border-bottom: 1px solid lightgray;
    text-align: left;
    padding: 8px;
    
    &:first-child {
      word-wrap: break-spaces;
      min-width: 10rem;
    }
  }
`;

const AddRowContainer = styled.div`
  display: flex;
  padding: 10px;
`;

export default EntryForm;