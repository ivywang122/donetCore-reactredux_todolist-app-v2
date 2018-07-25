import React, { Component } from 'react'
import { FaPencil, FaStarO, FaStar, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import { TaskToolsDefault } from '../styled/components/TasksViewStyled'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import Checkbox from '../common/Checkbox'
import styled from 'styled-components'

class Todo extends Component{
  constructor(props) {
    super(props);
    this.handleInputChange = this._handleInputChange.bind(this);
    this.onMark = this._onMark.bind(this);

    this.state = {

    }

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const todo = this.props.todo;
    // const { isCompleted, isMarked } = this.state;
    return (
      <TodoContainer isMarked={todo.isMarked}>
        <Checkbox handleInputChange={event => this.handleInputChange(event, todo)} isChecked={todo.isCompleted} />
        <TodoTitle isCompleted={todo.isCompleted}>{todo.title}</TodoTitle>
        <TaskToolsDefault>
          {todo.isMarked ?
            <FaStar className="fa-icon fa-star" onClick={event => this.onMark(event, todo)} />
            :
            <FaStarO className="fa-icon fa-starO" onClick={event => this.onMark(event, todo)} />
          }
          <FaPencil className="fa-icon fa-pencil" />
        </TaskToolsDefault>
        <div>
          <FaCalendar />
          <FaFileTextO />
          <FaCommentingO />
        </div>
      </TodoContainer>
    );
  }

  _handleInputChange(event, todo) {
    this.props.todoActions.completeTodo(todo.index)
  }

  _onMark(event, todo) {
    this.props.todoActions.markTodo(todo.index)
  }

}

const TodoContainer = styled.div`
  margin-top: 10px;
  padding: 20px;
  background-color: ${props => props.theme.white};
  label {
    vertical-align: middle;
  }
`;

const TodoTitle = styled.h2`
  width: calc(100% - 90px );
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.isCompleted ? props.theme.silver : props.theme.darkGray};
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  margin: 0 0 0 10px;
  vertical-align: middle;
`;


const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    todoActions: bindActionCreators(actions.todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)