import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

const TodoForm = () => {

  const [todo, setTodo] = useState("");

  const {addTodo} = useTodo();

  const add = (e) => {
    e.preventDefault();
    // nothing much just passing arguments to addTodo function
    addTodo({todo:todo, completed:false})
    setTodo("");
  }

  return (
    <form onSubmit={add} className='flex'>
      <input 
      type="text" 
      placeholder='write todo'
      className='w-full text-black border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/80 py-1.5'
      value={todo}
      onChange={(e)=>setTodo(e.target.value)}
       />
       <button type='submit' className="bg-green-600 rounded-r-lg px-3 py-1 text-white shrink-0">Add</button>
    </form>
  )
}

export default TodoForm