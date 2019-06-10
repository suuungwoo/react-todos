import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
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
    const trimmedText = text.trim();
    if (trimmedText.length > 0) {
      const getUniqueId = () => `${new Date().getTime().toString(36)}-${Math.random().toString(36)}`;
      const todo = {
        id: getUniqueId(),
        text: trimmedText,
        done: false,
      };
      setTodos([...todos, todo]);
      document.getElementById('text').value = '';
      setText('');
    }
  };
  const handleDone = id => () => {
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].done = !todos[index].done;
    setTodos([...todos]);
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
          && todos.map((todo, i) => (
            <List>
              <ListItem key={i.toString()} button onClick={handleDone(todo.id)}>
                <Checkbox
                  tabIndex={-1}
                  disableRipple
                  checked={todo.done}
                  onChange={() => {
                    handleDone(todo.id);
                  }}
                />
                <ListItemText primary={todo.text} secondary={todo.done ? '完了' : '未完了'} />
              </ListItem>
            </List>
          ))}
      </div>
    </div>
  );
}

export default App;
