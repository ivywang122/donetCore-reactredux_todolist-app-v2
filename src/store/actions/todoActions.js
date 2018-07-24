import actionTypes from '../actionTypes'

export function addTodo(todo) {
  let payload = {
    title: todo.title,
    comment: todo.comment,
    selectedDay: todo.selectedDay,
    selectTime: todo.selectTime,
    files: todo.files,
    isFile: todo.isFile,
    isMarked: todo.isMarked
  }

  return {
    type: actionTypes.addTodo,
    payload
  }
}