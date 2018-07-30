import React, { Component } from 'react'
import ViewContainer from './ViewContainer'
class CompletedView extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return <ViewContainer isTodosCompleted />
  }

}

export default CompletedView