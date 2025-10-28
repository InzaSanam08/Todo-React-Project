import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

  // Add new todo
  const handleAdd = () => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setText('')
    }
  }

  // Delete todo
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggle complete status
  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Clear all todos
  const handleClearAll = () => {
    setTodos([])
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <>
      <h1 className="todo-heading">My To-Do List</h1>

      <div className="todo-input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button onClick={handleAdd} className="todo-btn">
          Add
        </button>
        <button onClick={handleClearAll} className="todo-btn">
          Delete Todo
        </button>
      </div>

      <div className="todo-list-container">
        {todos.length === 0 ? (
          <p className="empty-message">No tasks yet. Add some tasks above!</p>
        ) : (
          <ul className="todo-ul">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-li ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-item">
                  <span className="todo-text">{todo.text}</span>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App