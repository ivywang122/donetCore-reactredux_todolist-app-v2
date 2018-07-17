import React, { Component } from 'react'
import { ChkboxStyled } from '../styled/common/CheckBoxStyled'

export default class Checkbox extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.isChecked !== prevProps.isChecked)
      this.setState({ isChecked: this.props.isChecked })
  }

  render() {
    const { isChecked } = this.state;
    return (
      <ChkboxStyled isChecked={isChecked}>
        <input type="checkbox" checked={isChecked} onChange={this.props.handleInputChange} />
      </ChkboxStyled>
    );
  }
}

