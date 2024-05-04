import React, { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const App = () => {

  // created a state for storing all the todos
  const [todos, setTodos] = useState([]);

  // created function to add todo which takes todo (object) as parameter
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
  }

  // created function to update todo which takes todo id and todo itself
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo)))
  }

  // created function to delete todo which takes todo id
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((eachTodo) => (eachTodo.id !== id) ))
  }

  // created function to toggle the status of todo(completed or not)
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((eachTodo) => (eachTodo.id === id ? {...eachTodo, completed: !eachTodo.completed} : eachTodo)))
  }

  // getting todos from local storage
  useEffect(()=>{
    const myTodos = JSON.parse(localStorage.getItem("todos"));

    if(myTodos && myTodos.length>0){
      setTodos(myTodos)
    }
  },[])

  // setting todos to local storage
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <>
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className='bg-gray-500 min-h-screen py-8'>
        <div className='w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Add Todos</h1>
          <div className='mb-4'>
            {/* Add todos here */}
            <TodoForm />
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {/* Todo list here  */}
            {/* looping over the todos array */}
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
    </>
  )
}

export default App