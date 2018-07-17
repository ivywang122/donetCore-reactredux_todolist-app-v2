import React, { Component } from 'react'
import styled from 'styled-components'
import Todo from './Todo'

class TodoList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      Todos: [],

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}


export default TodoList