import React, { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const App = () => {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((eachTodo) => (eachTodo.id !== id) ))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((eachTodo) => (eachTodo.id === id ? {...eachTodo, completed: !eachTodo.completed} : eachTodo)))
  }

  useEffect(()=>{
    const myTodos = JSON.parse(localStorage.getItem("todos"));

    if(myTodos && myTodos.length>0){
      setTodos(myTodos)
    }
  },[])

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