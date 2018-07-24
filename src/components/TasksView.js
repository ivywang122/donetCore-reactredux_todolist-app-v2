import React, { Component } from 'react'
import { FaPlus, FaPencil, FaStarO, FaStar } from 'react-icons/lib/fa'
import { TaskContainer, InputTaskWrapper, InputTask, TaskTools } from '../styled/components/TasksViewStyled'
import EditTodo from './EditTodo'
import TodoList from './TodoList'

class TasksView extends Component {
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
    return(
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
        <EditTodo isEdit={this.state.isEdit} 
          title={this.state.value} 
          isMarked={this.state.isMarked} 
          onCloseTask={this.onCloseTask} />
        <TodoList />
      </TaskContainer>
    );
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
    });
  }

  _onMark() {
    let isMarked;
    isMarked = this.state.isMarked? false : true;
    this.setState({ isMarked: isMarked, appeared: true});
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

export default TasksView