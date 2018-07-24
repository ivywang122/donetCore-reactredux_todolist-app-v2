import React, { Component } from 'react'
import { FaPencil, FaStarO, FaStar, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import { TaskToolsDefault } from '../styled/components/TasksViewStyled'
import Checkbox from '../common/Checkbox'
import styled from 'styled-components'

class Todo extends Component{
  constructor(props) {
    super(props);
    this.handleInputChange = this._handleInputChange.bind(this);
    this.onMark = this._onMark.bind(this);

    this.state = {
      index: 0,
      title: '',
      comment: '',
      selectedDay: undefined,
      selectTime: undefined,
      files: [],
      isFiles: false,
      isMarked: false,
      isCompleted: false,
    }

  }

  componentDidMount() {
    let todo = this.props.todo;
    this.setState({
      index: todo.index,
      title: todo.title,
      comment: todo.comment,
      selectedDay: todo.selectedDay,
      selectTime: todo.selectTime,
      files: todo.files,
      isFile: todo.isFile,
      isMarked: todo.isMarked,
      isCompleted: todo.isCompleted,
    });
  }

  render() {
    const { isCompleted, isMarked } = this.state;
    return (
      <TodoContainer isMarked={isMarked}>
        <Checkbox handleInputChange={this.handleInputChange} isChecked={isCompleted} />
        <TodoTitle isCompleted={isCompleted}>{this.state.title}</TodoTitle>
        <TaskToolsDefault>
          {this.state.isMarked ?
            <FaStar className="fa-icon fa-star" onClick={this.onMark} />
            :
            <FaStarO className="fa-icon fa-starO" onClick={this.onMark} />
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

  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({ isCompleted: value });
  }

  _onMark() {
    let isMarked = this.state.isMarked ? false : true;
    this.setState({ isMarked });
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
  color: ${props => props.theme.darkGray};
  margin: 0 0 0 10px;
  vertical-align: middle;
`;


export default Todo