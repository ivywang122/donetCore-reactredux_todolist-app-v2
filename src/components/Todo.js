import React, { Component } from 'react'
import { FaPencil, FaStarO, FaStar, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import { TaskToolsDefault } from '../styled/components/TasksViewStyled'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import actions from '../store/actions'
import Checkbox from '../common/Checkbox'
import styled from 'styled-components'

class Todo extends Component{
  constructor(props) {
    super(props);
    this.renderInfoWrapper = this._renderInfoWrapper.bind(this);
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
    const selectedDay = todo.selectedDay? moment(todo.selectedDay).format('YYYY/MM/DD') : undefined;
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

        { this.renderInfoWrapper(todo, selectedDay) }
        
       

      </TodoContainer>
    );
  }

  _renderInfoWrapper(todo, selectedDay) {
    if (selectedDay || todo.isFile || todo.comment.length > 0) {
      return (
        <TodoIfnoWrapper>
          {selectedDay ?
            <span>
              <FaCalendar className="fa-icon" /><InfoText>{selectedDay}</InfoText>
            </span>
            :
            null
          }

          {todo.isFile ?
            <span>
              <FaFileTextO className="fa-icon" /><InfoText>{todo.files.length}</InfoText>
            </span>
            :
            null
          }

          {todo.comment.length > 0 ?
            <span>
              <FaCommentingO className="fa-icon" /><InfoText comment>{todo.comment}</InfoText>
            </span>
            :
            null
          }

        </TodoIfnoWrapper>

      );
    }else return null;
    

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

const TodoIfnoWrapper = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.materialSteel};
  span{
    margin-right: 10px;
  }
  .fa-icon{
    vertical-align: text-top;
    font-size: 20px;
    padding-right: 5px;
  }
`;

const InfoText = styled.span`
  vertical-align: bottom;
  font-size: 14px;
  display: ${props => props.comment? 'inline-block' : 'inline'};
  text-overflow: ${props => props.comment? 'ellipsis' : 'clip'};
  width: ${props => props.comment? '140px' : 'auto'};
  white-space: nowrap;
  overflow : hidden;
  color: ${props => props.theme.darkGray};
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