import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import './App.scss';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
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
  const handleDelete = id => () => {
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    setTodos([...todos]);
  };
  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        React Todos
      </Typography>

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
        <IconButton onClick={() => setFilter('all')} disabled={filter === 'all'}>
          全て
        </IconButton>
        <IconButton onClick={() => setFilter('done')} disabled={filter === 'done'}>
          未完了
        </IconButton>
        <IconButton onClick={() => setFilter('notDone')} disabled={filter === 'notDone'}>
          完了
        </IconButton>
      </div>
      <div>
        {todos
          && todos
            .filter(
              todo => (filter === 'all' && todo)
                || (filter === 'done' && todo.done)
                || (filter === 'notDone' && !todo.done),
            )
            .map((todo, i) => (
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
                  <ListItemSecondaryAction>
                    <IconButton onClick={handleDelete(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ))}
      </div>
    </div>
  );
}

export default App;
