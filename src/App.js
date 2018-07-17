import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import RouterView from './routes'
import './scss/styles.css'

// Let styled-components use sass variables by add theme
/* eslint import/no-webpack-loader-syntax: off */
import { ThemeProvider } from 'styled-components'
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./scss/_base/_variables.scss')

// Create browser history to use in the Redux store
const history = createHistory()

// devToolsEnhacer: to see redux actions log on console
const logger = createLogger({ collapsed: true })

// In development, use the chorme's Redux dev tools extension if installed
const devReduxTools = []
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  devReduxTools.push(window.devToolsExtension())
}

// Add variety tasks
const middleWare = applyMiddleware(thunk, routerMiddleware(history), logger)

const initialState = window.initialReduxState
const store = createStore(
  combineReducers({
    ...rootReducer,
    routing: routerReducer
  }),
  initialState,
  compose(middleWare, ...devReduxTools)
)

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
