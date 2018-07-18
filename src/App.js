import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store'
import RouterView from './routes'
import './scss/styles.css'

// Let styled-components use sass variables by add theme
/* eslint import/no-webpack-loader-syntax: off */
import { ThemeProvider } from 'styled-components'
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./scss/_base/_variables.scss')

// Create browser history to use in the Redux store
const history = createHistory()
const initialState = { todos: [] }

const store = configureStore(history, initialState)

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <RouterView />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
