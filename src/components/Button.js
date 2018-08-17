import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const colors = {
  'lightgray': { fg: 'black', bg: 'var(--lightgray)' },
  'darkblue': { fg: 'white', bg: 'var(--darkblue)' },
  'orange': { fg: 'white', bg: 'var(--orange)' },
};


class Button extends Component {

  render() {
    // noinspection JSUnusedLocalSymbols
    const {to, onClick, history, ...rest} = this.props;
    const c = colors[this.props.color];
    return (
      <StyledButton fg={c.fg} bg={c.bg} {...rest} onClick={this.handleClick}>
        {this.props.children}
      </StyledButton>
    );
  }
  
  handleClick = () => {
    this.props.onClick && this.props.onClick();
    if (this.props.to) {
      this.props.history.push(this.props.to);
    }
  }

}

Button.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['lightgray', 'orange', 'darkblue']),
  block: PropTypes.bool,
};

Button.defaultProps = {
  color: 'darkblue'
};

const StyledButton = styled.button`
  color: ${props => props.fg};
  background: ${props => props.bg};
  border: 0;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  width: ${props => props.block ? '100%' : 'auto'};
  display: ${props => props.block ? 'block' : 'inline-block'};
  letter-spacing: 1px;
  border-radius: 3px;
  padding: .7rem 1rem;
`;

export default withRouter(Button);
