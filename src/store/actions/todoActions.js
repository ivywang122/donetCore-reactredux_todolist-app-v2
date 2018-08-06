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

export function completeTodo(index) {
  return {
    type: actionTypes.completeTodo,
    index
  }
}

export function markTodo(index) {
  return {
    type: actionTypes.markTodo,
    index
  }
}

export function addCompletedTodo(todo) {
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
    type: actionTypes.addCompletedTodo,
    payload
  }
}

export function pushCacheToFiles(index, cacheFiles) {
  return {
    type: actionTypes.pushCacheToFiles,
    index,
    cacheFiles
  }
}

export function onEditTodo(index) {
  return {
    type: actionTypes.onEditTodo,
    index
  }
}

export function onCloseEditTodo(index) {
  return {
    type: actionTypes.onCloseEditTodo,
    index
  }
}