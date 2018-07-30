import actionTypes from '../actionTypes'

let todoId = 0;

const reducers = {
  
  [actionTypes.addTodo]: (state, action) => {

    let todo = {
      index: todoId++,
      title: action.payload.title,
      comment: action.payload.comment,
      selectedDay: action.payload.selectedDay,
      selectTime: action.payload.selectTime,
      files: action.payload.files,
      isFile: action.payload.isFile,
      isMarked: action.payload.isMarked,
      isCompleted: false
    }

    return [...state, todo]
  },

  [actionTypes.completeTodo]: (state, action) => {
    return state.map(todo => 
      todo.index === action.index? {...todo, isCompleted: !todo.isCompleted} : todo
    )
  },

  [actionTypes.markTodo]: (state, action) => {
    return state.map(todo => 
      todo.index === action.index? {...todo, isMarked: !todo.isMarked} : todo
    )
  },

  [actionTypes.addCompletedTodo]: (state, action) => {
    let todo = {
      index: todoId++,
      title: action.payload.title,
      comment: action.payload.comment,
      selectedDay: action.payload.selectedDay,
      selectTime: action.payload.selectTime,
      files: action.payload.files,
      isFile: action.payload.isFile,
      isMarked: action.payload.isMarked,
      isCompleted: true
    }

    return [...state, todo]
  }

}
// initialState = []; from Store
export default function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    if (reducers.hasOwnProperty(action.type))
      return reducers[action.type](state, action)
    else return state
  }
}