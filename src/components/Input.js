import React from 'react';
import styled from 'styled-components'

function InputGroup({ type, id, onChange, helpText, error, placeholder, value }) {
  return (
    <div>
      <Input
        className={error ? 'has-error' : ''}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      { helpText && <HelpText className={error ? 'has-error help-text' : 'help-text'}>{helpText}</HelpText> }
      { error && <Error><small>{error}</small></Error> }
    </div>
    );
}

const Input = styled.input`
    margin-bottom: .1rem;
    
    &.has-error {
      border-color: var(--red);
      border:  1px solid var(--red); 
    }
`;

const HelpText = styled.small`
    margin-left: .3rem;
`;

const Error = styled.p`
    margin: .3rem;
    color: var(--red);
`;

export default InputGroup;