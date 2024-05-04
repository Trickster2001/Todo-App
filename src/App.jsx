import React from 'react'
import { TodoProvider } from './components/TodoContext'

const App = () => {
  return (
    <>
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>Hello World!</TodoProvider>
    </>
  )
}

export default App