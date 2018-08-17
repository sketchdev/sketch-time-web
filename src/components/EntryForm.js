import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class EntryForm extends Component {
  render() {
    return (
      <form>
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
            <th><div className={'big'}>Week</div><div className={'big'} style={{paddingTop: '5px'}}>{this.props.data.weekTotal.toString()}</div></th>
          </tr>
          </thead>
          <tbody>
          {
            (this.props.data.entries && this.props.data.entries.length > 0) && this.props.data.entries.map((entry, entryIndex) => {
              return <tr key={'entry'+entryIndex}>
                <td>
                  {this.props.data.projects && this.props.data.projects.length > 0 ? this.props.data.projects.find(p => { return entry.project_id === p.id }).name : ''}
                </td>
                  { entry.days.map((h, dayIndex) => {
                    return <td key={'day'+dayIndex}>
                      <input
                        className={this.props.data.errors[`entry${entryIndex}-${dayIndex}`] || this.props.data.errors[`entry${entryIndex}`] ? 'has-error' : ''}
                        value={h}
                        onChange={(e) => this.props.handleDayChange(e, entryIndex, dayIndex)}
                        onBlur={(e) => this.props.handleDayBlur(e, entryIndex, dayIndex)}
                        type="text"
                        placeholder="0.0"
                      />
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
          <Link to={{pathname: '/users/projects', state: { week: this.props.data.week, year: this.props.data.year }}}><button className={'btn-small btn-secondary'} >Add Projects</button></Link>
          <button onClick={this.props.handleSubmit} className={'btn-small'}>Save</button>
        </AddRowContainer>
      </form>
    );
  }
}



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