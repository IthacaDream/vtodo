import React, { Component  } from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' onKeyPress={e => this.handleKeyPress(e)} />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }

  handleClick = (e) => {
    const text = this.refs.input.value.trim();
    if(text === ''){
      return;
    }
    this.props.onAddClick(text);
    this.refs.input.value = '';
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleClick(event);
    }
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
