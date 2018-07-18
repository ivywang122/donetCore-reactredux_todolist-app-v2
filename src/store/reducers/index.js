import actionTypes from '../actionTypes'

const reducers = {
  
  [actionTypes.addTodo]: (state, action) => {
    return {
      ...state,
      todos: action.todos
    }
  }

}

export default function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    if (reducers.hasOwnProperty(action.type))
      return reducers[action.type](state, action)
    else return state
  }
}