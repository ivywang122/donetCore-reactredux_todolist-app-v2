import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from '../common/Navbar'
import { BodyBackGround } from '../styled/common/CommonStyled'
import TasksView from '../components/TasksView'
import CompletedView from '../components/CompletedView'
import ProgressView from '../components/ProgressView'

class RouterView extends Component {
  render(){
    return (
      <Router>
        <div>
          <Navbar />
          <BodyBackGround>
            <Switch>
              <Route exact path="/" component={TasksView} />
              <Route path="/progress" component={ProgressView} />
              <Route path="/completed" component={CompletedView} />
            </Switch>
          </BodyBackGround>
        </div>
      </Router>

    );
  }

}

export default RouterView