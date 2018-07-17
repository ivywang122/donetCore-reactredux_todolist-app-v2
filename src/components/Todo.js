import React, { Component } from 'react'
import { FaPencil, FaStarO, FaStar, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import styled from 'styled-components'
import { TaskToolsDefault } from '../styled/components/TasksViewStyled'
import Checkbox from '../common/Checkbox'

class Todo extends Component{
  constructor(props) {
    super(props);
    this.handleInputChange = this._handleInputChange.bind(this);
    this.onMark = this._onMark.bind(this);

    this.state = {
      isChecked: false,
      isMarked: false
    }

  }

  componentDidMount() {

  }

  render() {
    const { isChecked, isMarked } = this.state;
    return (
      <TodoContainer isMarked={isMarked}>
        <Checkbox handleInputChange={this.handleInputChange} isChecked={isChecked} />
        <TodoTitle isChecked={isChecked}>Task Title</TodoTitle>
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
    this.setState({ isChecked: value });
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