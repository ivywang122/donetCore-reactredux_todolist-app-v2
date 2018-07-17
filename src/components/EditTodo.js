import React, { Component } from 'react'
import { FaPlus, FaCalendar, FaFileTextO, FaCommentingO } from 'react-icons/lib/fa'
import { MdClose } from 'react-icons/lib/md'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import TimePicker from 'rc-time-picker'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment'
import moment from 'moment'
import 'moment/locale/it'
import Dropzone from 'react-dropzone'
import { EditTodoWrapper, EditTodoBtnWrapper, Block, Title, Content, DropText, FilesContainer, DropEnterBlock, TextArea, BtnAddTask, BtnCancel} from '../styled/components/EditTodoStyled'

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

    this.state = {
      selectedDay: undefined,
      selectTime: moment(),
      timeFormat: 'h:mm a',
      files: [],
      comments: '',
      dropzoneActive: false,
    }
  }
  render() {

    return(
      <EditTodoWrapper isEdit={this.props.isEdit} >
        <Block index="0" className="picker-zindex">
          <Title><FaCalendar className="fa-icon" />Deadline</Title>
          <Content>
            <DayPickerInput
              formatDate={formatDate}
              parseDate={parseDate}
              format="YYYY/MM/DD"
              placeholder={`${formatDate(new Date(), 'YYYY/MM/DD', 'it')}`}
              dayPickerProps={{ locale: 'it', localeUtils: MomentLocaleUtils }}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayPick} />
            <TimePicker use12Hours inputReadOnly
              showSecond={false}
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
            <TextArea value={this.state.comments} onChange={this.handleTextChange} />
          </Content>
        </Block>

        <EditTodoBtnWrapper>
          <BtnCancel onClick={this.props.onCloseTask}><MdClose /> Cancel</BtnCancel>
          <BtnAddTask><FaPlus /> Add Task</BtnAddTask>
        </EditTodoBtnWrapper>

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

  _handleDayPick(day, { selected }) {
    this.setState({ selectedDay: selected? undefined : day });
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
      dropzoneActive: false
    });
  }

  _onDragEnter() {
    this.setState({ dropzoneActive: true });
  }

  _onDragLeave() {
    this.setState({ dropzoneActive: false });
  }

  _onDeleteFile(event, file) {
    let files = this.state.files;
    for(let i = files.length -1; i >= 0; i--){
      if(files[i] === file) files.splice(i, 1);
    }

    this.setState({ files });
  }

  _handleTextChange(event) {
    this.setState({ comments: event.target.value });
  }

}

export default EditTodo