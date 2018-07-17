import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import TasksView from '../components/TasksView'
import { BodyBackGround } from '../styled/common/CommonStyled'

class RouterView extends Component {
  render(){
    return (
      <Router>
        <div>
          <Navbar />
          <BodyBackGround>
            <Switch>
              <Route exact path="/" component={TasksView} />
            </Switch>
          </BodyBackGround>
        </div>
      </Router>

    );
  }

}

export default RouterView