import React, { Component } from 'react';
import styled from 'styled-components';

class Table extends Component {
  render() {
    return (
      <StyledTable>
        <thead>
          <StyledRow>
            { this.props.headers.map((header, index) => {
              return <StyledHeader key={index}>{header.title}</StyledHeader>;
            })}
          </StyledRow>
        </thead>
        <tbody>
          { this.props.list.map((l, index) => {
            return <StyledRow key={index}>
              { this.props.headers.map((header, index) => {
                return <StyleData key={index}>{l[header.field]}</StyleData>;
              })}
            </StyledRow>;
          })}
        </tbody>
      </StyledTable>
    );
  }
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledRow = styled.tr`
   :nth-child(even) {
     background-color: var(--overcast);
   }
`;

const StyleData = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const StyledHeader = StyleData.extend`
  font-weight: 600;
`;

export default Table;