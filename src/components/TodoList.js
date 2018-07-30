import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'

class TodoList extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  // componentDidMount() {
  //   this.setState({ todos: this.props.todos })
  // }

  // componentDidUpdate(prevProps) {
  //   if (!this.isObjValEqual(prevProps.todos, this.props.todos))
  //     this.setState({ todos: this.props.todos })
  // }

  render() { 
    return <div>{this.renderTodos()}</div>
  }

  renderTodos() {
    const todos = this.props.todos;

    if (this.props.isTodosCompleted) {
      return todos && todos.filter(todo => todo.isCompleted).map((todo, index) => {
        return <Todo key={todo.index} todo={todo} />
      });

    } else if (this.props.isTodosInProgress) {
      return todos && todos.filter(todo => !todo.isCompleted).map((todo, index) => {
        return <Todo key={todo.index} todo={todo} />
      });

    }else {
      return todos && todos.map((todo, index) => {
        return <Todo key={todo.index} todo={todo} />
      });

    }

  }

  isObjValEqual(obj1, obj2) {
    let aProps = Object.getOwnPropertyNames(obj1),
        bProps = Object.getOwnPropertyNames(obj2);
    
    if (aProps.length !== bProps.length) 
      return false;
    
    for(let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];
      if(obj1[propName] !== obj2[propName]) 
        return false;
    }

    return true;
  }

}


const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(TodoList)