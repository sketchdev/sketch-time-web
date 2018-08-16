import React, { Component } from 'react';
import StyledTable from '../components/StyledTable';

class Table extends Component {
  render() {
    return (
      <StyledTable>
        <thead>
          <tr>
            { this.props.headers.map((header, index) => {
              return <th key={index}>{header.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          { this.props.list && this.props.list.map((l, index) => {
            return <tr key={index}>
              { this.props.headers.map((header, index) => {
                return <td key={index}>{l[header.field]}</td>;
              })}
            </tr>;
          })}
        </tbody>
      </StyledTable>
    );
  }
}

export default Table;