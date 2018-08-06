import React, { Component } from 'react'
import { FaPencil, FaStarO, FaStar, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import { TaskToolsDefault } from '../styled/components/TasksViewStyled'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { TodoContainer, TodoTitle, TodoIfnoWrapper, InfoText } from '../styled/components/TodoStyled'
import actions from '../store/actions'
import Checkbox from '../common/Checkbox'
import EditTodo from './EditTodo'

class Todo extends Component{
  constructor(props) {
    super(props);
    this.renderInfoWrapper = this._renderInfoWrapper.bind(this);
    this.handleInputChange = this._handleInputChange.bind(this);
    this.handleChange = this._handleChange.bind(this);
    this.onMark = this._onMark.bind(this);
    this.onEdit = this._onEdit.bind(this);
    this.onCloseTask = this._onCloseTask.bind(this);

    this.state = {
      title: this.props.todo.title,
      isEdit: false
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
      <div>
        <TodoContainer isMarked={todo.isMarked} isEdit={this.state.isEdit}>
          <Checkbox handleInputChange={event => this.handleInputChange(event, todo)} isChecked={todo.isCompleted} />
          {this.state.isEdit? 
            <TodoTitle type="text" isCompleted={todo.isCompleted} value={this.state.title} onChange={this.handleChange} />
            :
            <TodoTitle type="text" disabled isCompleted={todo.isCompleted} value={todo.title} onChange={this.handleChange} />
          }
          <TaskToolsDefault>
            {todo.isMarked ?
              <FaStar className="fa-icon fa-star" onClick={event => this.onMark(event, todo)} />
              :
              <FaStarO className="fa-icon fa-starO" onClick={event => this.onMark(event, todo)} />
            }
            <FaPencil className="fa-icon fa-pencil" onClick={event => this.onEdit(event, todo)}/>
          </TaskToolsDefault>

          { this.renderInfoWrapper(todo, selectedDay) }

        </TodoContainer>

        <EditTodo todo={todo} forEditSave
          isEdit={this.state.isEdit}
          title={this.state.title}
          isMarked={todo.isMarked}
          onCloseTask={this.onCloseTask} />

      </div>
    );
  }

  _renderInfoWrapper(todo, selectedDay) {
    if (this.state.isEdit)
      return null

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

  _handleChange(event) {
    this.setState({ title: event.target.value });
  }

  _onMark(event, todo) {
    this.props.todoActions.markTodo(todo.index)
  }

  _onEdit(event, todo) {
    if (!this.state.isEdit)
      this.setState({ isEdit: true })
  }

  _onCloseTask() {
    this.setState({
      title: this.props.todo.title,
      isEdit: false
    });
  }

}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    todoActions: bindActionCreators(actions.todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)