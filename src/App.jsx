import React, { useState } from 'react';
import {
  IconButton, Typography, TextField, List, ListItem, ListItemText,
} from '@material-ui/core';
import './App.scss';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      text,
      done: false,
    };
    setTodos([...todos, todo]);
    document.getElementById('text').value = '';
  };
  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        React Todos
      </Typography>
      <div>
        <IconButton>全て</IconButton>
        <IconButton>未完了</IconButton>
        <IconButton>完了</IconButton>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="text"
            variant="outlined"
            placeholder="タスクを追加する"
            onChange={handleChange}
          />
        </form>
      </div>
      <div>
        {todos
          && todos.map(todo => (
            <List>
              <ListItem button>
                <ListItemText primary={todo.text} />
              </ListItem>
            </List>
          ))}
      </div>
    </div>
  );
}

export default App;
