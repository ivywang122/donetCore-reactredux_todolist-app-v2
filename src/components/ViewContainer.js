import React, { Component } from 'react'
import { FaPlus, FaPencil, FaStarO, FaStar } from 'react-icons/lib/fa'
import { TaskContainer, InputTaskWrapper, InputTask, TaskTools } from '../styled/components/TasksViewStyled'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import EditTodo from './EditTodo'
import TodoList from './TodoList'

class ViewContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.onFocus = this._onFocus.bind(this);
    this.onMark = this._onMark.bind(this);
    this.onCloseTask = this._onCloseTask.bind(this);

    this.state = {
      value: '',
      placeholder: '',
      isEdit: false,
      isMarked: false,
      appeared: false
    }
  }

  componentDidMount() {
    this.setState({ placeholder: 'Add Task' })
  }

  render() {
    return (
      <TaskContainer>
        <InputTaskWrapper isEdit={this.state.isEdit}>
          <FaPlus className="fa-plus" />
          <InputTask type="text"
            value={this.state.value}
            placeholder={this.state.placeholder}
            onFocus={this.onFocus}
            onChange={this.handleChange}
          />
          <TaskTools isEdit={this.state.isEdit}>
            {this.renderStar()}
            <FaPencil className="fa-icon fa-pencil" />
          </TaskTools>
        </InputTaskWrapper>

        {this.props.isTodosCompleted? 
          <EditTodo completedAdd
            isEdit={this.state.isEdit}
            title={this.state.value}
            isMarked={this.state.isMarked}
            onCloseTask={this.onCloseTask} />
          :
          <EditTodo 
            isEdit={this.state.isEdit}
            title={this.state.value}
            isMarked={this.state.isMarked}
            onCloseTask={this.onCloseTask} />
        }
        
        {this.renderTodoList()}

      </TaskContainer>
    );
  }

  renderTodoList() {
    if (this.props.isTodosCompleted)
      return <TodoList isTodosCompleted />
    else if (this.props.isTodosInProgress)
      return <TodoList isTodosInProgress />
    else 
      return <TodoList />
  }

  renderStar() {
    if (!this.state.appeared)
      return <FaStarO className="fa-icon fa-starO" onClick={this.onMark} />
    else if (!this.state.isMarked)
      return <FaStarO className="fa-icon fa-star appear" onClick={this.onMark} />
    else
      return <FaStar className="fa-icon fa-star" onClick={this.onMark} />
  }

  _handleChange(event) {
    this.setState({ value: event.target.value });
  }

  _onFocus() {
    this.setState({
      placeholder: 'Type Something Here...',
      isEdit: true,
      focused: true
    }, () => {
      if(this.props.todos.length > 0)
        this.props.todoActions.closeAllEditTodo()
    });
  }

  _onMark() {
    let isMarked;
    isMarked = this.state.isMarked ? false : true;
    this.setState({ isMarked: isMarked, appeared: true });
  }

  _onCloseTask() {
    this.setState({
      value: '',
      placeholder: 'Add Task',
      isEdit: false,
      isMarked: false,
      appeared: false
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer)