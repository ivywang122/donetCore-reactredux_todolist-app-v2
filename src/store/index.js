import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import createReducer from './reducers'

export default function configureStore(history, initialState) {

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

  const reducers = combineReducers({
    todos: createReducer([]),
    routing: routerReducer,
  })

  // output
  return createStore(
    reducers,
    initialState,
    compose(middleWare, ...devReduxTools)
  )

}