import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class FormField extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.focus) {
      this.inputRef.current.focus()
    }
  }

  render() {
    return (
      <Container className={'mb2'} error={this.props.error}>
        {this.props.label && <div className={'mb1'}>{<label>{this.props.label}</label>}</div>}
        <div className={'mb1'}>
          {this.props.options ? (
            <StyledSelect
              innerRef={this.inputRef}
              error={this.props.error}
              value={this.props.value}
              onChange={this.props.onChange}
              name={this.props.name}>
              id={this.props.name}
              {this.normalizeOptions().map(o => (
                <option key={o.val} value={o.val}>{o.label}</option>
              ))}
            </StyledSelect>
          ) : (
            <StyledInput
              innerRef={this.inputRef}
              error={this.props.error}
              type={this.props.type || 'text'}
              value={this.props.value}
              onChange={this.props.onChange}
              name={this.props.name} 
              id={this.props.name}
              placeholder={this.props.placeholder}/>
          )}
        </div>
        {this.props.help && <HelpText error={this.props.error} className={'mb1'}>{this.props.help}</HelpText>}
      </Container>
    );
  }

  normalizeOptions = () => {
    const options = [];
    if (Array.isArray(this.props.options)) {
      for (const op of this.props.options) {
        if (typeof op === 'string') {
          options.push({val: op, label: op});
        } else {
          options.push(op);
        }
      }
    } else {
      for (const [k, v] of Object.entries(this.props.options)) {
        options.push({val: k, label: v});
      }
    }
    return options;
  };
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  options: PropTypes.any,
  placeholder: PropTypes.string,
};

const Container = styled.div`
  ${props => props.error ? `color: var(--red);` : ''}
`;

const StyledInput = styled.input`
  margin-top: var(--space-1);
  margin-bottom: var(--space-1);
  ${props => props.error ? `border-color: var(--red);` : ''}
`;

const StyledSelect = styled.select`
  ${props => props.error ? `border-color: var(--red);` : ''}
`;

const HelpText = styled.div`
  text-align: left;
  color: ${props => props.error ? 'var(--red)' : 'var(--lightgray)'};
`;

export default FormField;

