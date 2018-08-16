import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  
  & thead > tr > th {
    border-bottom: 1px solid lightgray;
    text-align: left;
    padding: 8px;
    font-size: 0.8em;
    font-weight: 300;
    color: grey;
    text-transform: uppercase;
  }
  
  & tr:nth-child(even) {
     background-color: #ededed;
   }
  
  & td {
    border-bottom: 1px solid lightgray;
    text-align: left;
    padding: 8px;
  }
`;

export default StyledTable;