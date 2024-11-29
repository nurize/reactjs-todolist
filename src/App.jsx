import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([ ]);
  const [todoValue, setTodoValue] = useState('');

  const persistData = (newList) => {
    localStorage.setItem('todos', JSON.stringify(newList));
  };

  const handleAddTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  const handleDeleteTodo = (index) => {
    const newTodoList = todos.filter((todo, todoIndex) => { 
      return todoIndex !== index
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  const handleEditTodo = (index) => {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return 
    }
    
    try{
    localTodos = JSON.parse(localTodos)
    if (localTodos && Array.isArray(localTodos)){
      setTodos(localTodos)
    }} catch(error) {
      console.error('Error parsing JSON:', error)
    }
  }, [])
  /**you pass in a variable or state to make it listen for whenever a variable changes. 
   * But you leave it empty if you want it to run on page load
   */

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} todos={todos} handleDeleteTodo={handleDeleteTodo}/>
    </>
  )
}

export default App
