import React, { useEffect, useRef, useState } from 'react'
import { useTodo } from '../context/TodoContext'

const TodoItem = ({todo}) => {

  const [isTodoEdit, setIsTodoEdit] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const {updateTodo, deleteTodo, toggleComplete} = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo:todoMsg});
    setIsTodoEdit(false);
  }

  const toggle = () => {
    toggleComplete(todo.id);
  }

  const inputRef = useRef(null);

  useEffect(()=>{
    if(isTodoEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  },[isTodoEdit])

  return (
    <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 text-black ${todo.completed ? "bg-[#c6a9a7]" : "bg-[#ccbed7]"}`}>
      <input type="checkbox"
      className='cursor-pointer'
      checked={todo.completed}
      onChange={toggle} />
      <input ref={inputRef} type="text"
      className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEdit ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
      value={todoMsg}
      onChange={(e)=>setTodoMsg(e.target.value)}
      readOnly={!isTodoEdit}
      />
      <button className='w-8 h-8 rounded-lg text-sm border border-black/10 inline-flex justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
      onClick={()=>{
        if(todo.completed) return;
        if(isTodoEdit){
          editTodo();
        }else setIsTodoEdit((prev)=> !prev);
      }}
      disabled={todo.completed}
      >{isTodoEdit ? "📁" : "✏️"}</button>
      <button className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
      onClick={()=> deleteTodo(todo.id)}
      >❌</button>
    </div>
  )
}

export default TodoItem