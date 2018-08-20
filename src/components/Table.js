import React, { Component } from 'react';
import StyledTable from '../components/StyledTable';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

class Table extends Component {
  render() {
    return (
      <StyledTable>
        <thead>
          <tr>
            { this.props.headers.map((header, index) => {
              return <th key={index}>{header.title}</th>;
            })}
            { (this.props.edit || this.props.delete) && <th/> }
          </tr>
        </thead>
        <tbody>
          { this.props.list && this.props.list.map((l, index) => {
            return <tr key={index}>
              { this.props.headers.map((header, index) => {
                return <td key={index}>{l[header.field]}</td>;
              })}
              { (this.props.edit || this.props.delete) && <td>
                { this.props.edit && <Link to={this.props.edit + l.id}><Pencil/></Link> }
                { this.props.delete && <Link to={
                  {
                    pathname: this.props.delete,
                    state: { type: this.props.type, id: l.id, listPage: this.props.listPage }
                  }}><TrashCan/></Link> }
              </td> }
            </tr>;
          })}
        </tbody>
      </StyledTable>
    );
  }
}

const Pencil = styled(FaPencilAlt)`
  color: var(--orange);
  font-size: 1rem;
  margin-right: 10px;
`;

const TrashCan = styled(FaTrashAlt)`
  color: var(--red);
  font-size: 1rem;
`;



export default Table;