import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask, editTask, setFilter } from './store';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: task.id, text: editText.trim() }));
    } else {
      setEditText(task.text); 
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span 
          className={`task-text ${task.completed ? 'completed' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.text}
        </span>
      )}
      
      <button className="delete-btn" onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </button>
    </li>
  );
};

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const { tasks, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTask(inputValue.trim()));
      setInputValue('');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; 
  });

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app-container">
      <header>
        <h1>Tasks</h1>
        <form id="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            id="task-input"
            placeholder="What needs to be done?"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" id="add-btn">Add Task</button>
        </form>
      </header>

      <nav className="filters">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>

      <ul id="task-list">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      <footer>
        <span id="task-count">
          {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
        </span>
      </footer>
    </div>
  );
}