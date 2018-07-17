import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, FlexLinks } from '../styled/common/CommonStyled'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return(
      <header>
        <Nav>
          <div className="container">
            <FlexLinks>
              <NavLink exact to="/" activeClassName="active" className="navlink">Tasks View</NavLink>
              <NavLink to="/progress" className="navlink">In Progress</NavLink>
              <NavLink to="/completed" className="navlink">Completed</NavLink>
            </FlexLinks>
          </div>
        </Nav>
      </header>
    );
  }
}

export default Navbar