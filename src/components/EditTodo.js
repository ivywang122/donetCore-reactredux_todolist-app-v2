import React, { Component } from 'react'
import { FaPlus, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import { MdClose } from 'react-icons/lib/md'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import TimePicker from 'rc-time-picker'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment'
import 'moment/locale/it'
import Dropzone from 'react-dropzone'
import { EditTodoWrapper, EditTodoBtnWrapper, 
  Block, Title, Content, DropText, 
  FilesContainer, DropEnterBlock, TextArea, 
  BtnAdd, BtnCancel, WariningText} from '../styled/components/EditTodoStyled'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'

class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.renderFiles = this._renderFiles.bind(this);
    this.handleDayPick = this._handleDayPick.bind(this);
    this.handleTimePick = this._handleTimePick.bind(this);
    this.onDrop = this._onDrop.bind(this);
    this.onDragEnter = this._onDragEnter.bind(this);
    this.onDragLeave = this._onDragLeave.bind(this);
    this.onDeleteFile = this._onDeleteFile.bind(this);
    this.handleTextChange = this._handleTextChange.bind(this);
    this.onAddTodo = this._onAddTodo.bind(this);
    this.onCancelTodo = this._onCancelTodo.bind(this);
    this.onSaveTodo = this._onSaveTodo.bind(this);
    this.onCancelSaveTodo = this._onCancelSaveTodo.bind(this);

    this.state = {
      title: this.props.title,
      isMarked: this.props.isMarked,
      selectedDay: undefined,
      selectTime: undefined,
      timeFormat: 'h:mm a',
      files: [],
      cacheFiles: [],
      comment: '',
      dropzoneActive: false,
      warningText: '',
      wrapperHeight: 551
    }
  }

  componentDidMount() {
    if (this.props.forEditSave && this.props.todo) {
      let todo = this.props.todo;
      this.setState({
        selectedDay: todo.selectedDay,
        selectTime: todo.selectTime,
        cacheFiles: [...todo.files],
        files: todo.files,
        comment: todo.comment,
        wrapperHeight: 551 + todo.files.length * 31
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isMarked !== prevProps.isMarked || this.props.title !== prevProps.title) {
      this.setState({
        title: this.props.title,
        isMarked: this.props.isMarked 
      })
    }
  }


  render() {
    return(
      <EditTodoWrapper innerRef={elem => this.elemDiv = elem}
        isEdit={this.props.isEdit}
        height={this.state.wrapperHeight} >
        <Block index="0" className="picker-zindex">
          <Title><FaCalendar className="fa-icon" />Deadline</Title>
          <Content>
            <DayPickerInput
              formatDate={formatDate}
              parseDate={parseDate}
              format="YYYY/MM/DD"
              placeholder={`${formatDate(new Date(), 'YYYY/MM/DD', 'it')}`}
              dayPickerProps={{ locale: 'it', localeUtils: MomentLocaleUtils }}
              value={this.state.selectedDay}
              onDayChange={this.handleDayPick} />
            <TimePicker use12Hours inputReadOnly
              showSecond={false}
              minuteStep={15}
              defaultValue={this.state.selectTime}
              value={this.state.selectTime}
              onChange={this.handleTimePick}
              format={this.state.timeFormat} />
          </Content>
        </Block>

        <Block index="1">
          <Title><FaFileTextO className="fa-icon" />File</Title>
          {this.state.dropzoneActive && <DropEnterBlock>Dropping In</DropEnterBlock>}
          <Content>
            <Dropzone className="dropzone-style"
              accept="image/*"
              onDrop={this.onDrop}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              style={this.state.dropzoneActive ? {opacity: 0.25}: {opacity: 1}}
              >
              <FaPlus className="fa-icon" />
              <DropText>Dropping Images Files Here</DropText>
            </Dropzone> 
          </Content>

          {this.state.files.length !== 0? 
            <FilesContainer>
              {this.state.files.map((file, index) => {return this.renderFiles(file, index)})}
            </FilesContainer>
            :
            null
          }

        </Block>

        <Block index="2">
          <Title><FaCommentingO className="fa-icon" />Comment</Title>
          <Content last>
            <TextArea value={this.state.comment} onChange={this.handleTextChange} />
            <WariningText>{this.state.warningText}</WariningText>
          </Content>
        </Block>

        {this.props.forEditSave?
          /* For edit Existing Todo */
          <EditTodoBtnWrapper>
            <BtnCancel onClick={this.onCancelSaveTodo}><MdClose /> Cancel</BtnCancel> 
            <BtnAdd onClick={this.onSaveTodo}><FaPlus /> Save</BtnAdd>
          </EditTodoBtnWrapper>      
          :
          /* For Add New Todo */
          <EditTodoBtnWrapper>
            <BtnCancel onClick={this.onCancelTodo}><MdClose /> Cancel</BtnCancel>
            <BtnAdd onClick={this.onAddTodo}><FaPlus /> Add Task</BtnAdd>
          </EditTodoBtnWrapper>
        }

      </EditTodoWrapper>
    );
  }

  _renderFiles(file, index) {
    let fileSize = Math.round(file.size / 1024 * 10) / 10;
    return (
      <div key={"file-"+index} className="file-list" >
        <p>{file.name} - {fileSize} KB</p>
        <MdClose className="fa-icon" onClick={(event) => this.onDeleteFile(event, file)} />
      </div>
    );
  }

  _handleDayPick(day) {
    this.setState({ selectedDay: day });
  }

  _handleTimePick(time) {
    this.setState({ selectTime: time? time : this.state.selectTime });
  }

  _onDrop(files) {
    let allFiles = this.state.files;
    if(allFiles.length !== 0) {
      for(let i = 0 ; i < allFiles.length; i++) {
        for(let j = files.length - 1; j >= 0; j--) {
          if (allFiles[i].name === files[j].name && allFiles[i].size === files[j].size) 
            files.splice(j, 1);
        }
      }
      allFiles.push(...files);

    }else{
      allFiles.push(...files);
    }
 
    this.setState({
      files: allFiles,
      dropzoneActive: false,
      wrapperHeight: 552 + allFiles.length * 31
    });

  }

  _onDragEnter() {
    this.setState({ dropzoneActive: true });
  }

  _onDragLeave() {
    this.setState({ dropzoneActive: false });
  }

  _onDeleteFile(event, file) {
    let files = this.state.files,
      wrapperHeight = this.state.wrapperHeight;

    for(let i = files.length -1; i >= 0; i--){
      if(files[i] === file) files.splice(i, 1);
    }

    if(files.length === 0)
      wrapperHeight = 552;
    else {
      if( (wrapperHeight - 551) % 31 === 0 )
        wrapperHeight = wrapperHeight + 1 - 31;
      else
        wrapperHeight = wrapperHeight - 31;
    }

    this.setState({ files, wrapperHeight: wrapperHeight })
  }

  _handleTextChange(event) {
    this.setState({ comment: event.target.value });
  }

  _onAddTodo() {
    let todo = {
      title: this.state.title,
      comment: this.state.comment,
      selectedDay: this.state.selectedDay,
      selectTime: this.state.selectTime,
      files: this.state.files,
      isFile: this.state.files.length > 0,
      isMarked: this.state.isMarked
    }

    if(this.isEmpty(todo.title)) {
      this.setState({ warningText: '*Please type something as Task Title' })
    }else {
      // Add Completed Todo
      if (this.props.completedAdd)
        this.props.todoActions.addCompletedTodo(todo)
      // Add In Progress Todo
      else
        this.props.todoActions.addTodo(todo)
      
      this.setState({
        selectedDay: undefined,
        selectTime: undefined,
        timeFormat: 'h:mm a',
        files: [],
        comment: '',
        dropzoneActive: false,
        warningText: '',
        wrapperHeight: 551
      }, this.props.onCloseTask())
    }
      

  }

  _onCancelTodo() {
    this.setState({
      selectedDay: undefined,
      selectTime: undefined,
      timeFormat: 'h:mm a',
      files: [],
      comment: '',
      dropzoneActive: false,
      warningText: '',
      wrapperHeight: 551
    });
  
    this.props.onCloseTask();
  }

  _onSaveTodo() {
    let todo = {
      title: this.state.title,
      comment: this.state.comment,
      selectedDay: this.state.selectedDay,
      selectTime: this.state.selectTime,
      files: this.state.files,
      isFile: this.state.files.length > 0,
      isMarked: this.state.isMarked
    }

    if (this.isEmpty(todo.title)) {
      this.setState({ warningText: '*Please type something as Task Title' })
    } else {

      this.setState({
        selectedDay: undefined,
        selectTime: undefined,
        timeFormat: 'h:mm a',
        files: [],
        cacheFiles: [],
        comment: '',
        dropzoneActive: false,
        warningText: '',
        wrapperHeight: 551
      }, this.props.onCloseTask())
    }
  }

  _onCancelSaveTodo() {
    let todo = this.props.todo;
    this.setState({
      selectedDay: todo.selectedDay,
      selectTime: todo.selectTime,
      files: this.state.cacheFiles,
      comment: todo.comment,
      wrapperHeight: 551 + this.state.cacheFiles.length * 31
    }, () => {
      this.props.todoActions.pushCacheToFiles(todo.index, this.state.cacheFiles)
      this.props.onCloseTask()
    })
  }

  isEmpty(str) {
    if (str.replace(/(^s*)|(s*$)/g, "").length === 0) return true;
    else return false;
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)