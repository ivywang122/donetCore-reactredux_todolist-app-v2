import React, { Component } from 'react'
import ViewContainer from './ViewContainer'

class ProgressView extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return <ViewContainer isTodosInProgress />
  }

}

export default ProgressView