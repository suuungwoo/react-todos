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
  Button,
  ButtonGroup,
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
  const handleDeleteDone = () => {
    const newTodos = todos.filter(todo => todo.done === false);
    setTodos(newTodos);
  };
  const filteredTodos = todos.filter(
    todo => (filter === 'all' && todo)
      || (filter === 'done' && todo.done)
      || (filter === 'notDone' && !todo.done),
  );

  return (
    <div className="App">
      <div className="wrapper">
        <Typography component="h1" variant="h2" className="title">
          React Todos
        </Typography>

        <div className="form-block">
          <form onSubmit={handleSubmit}>
            <TextField
              id="text"
              variant="filled"
              placeholder="タスクを入力"
              onChange={handleChange}
            />
            <Button
              className="add-buton"
              variant="contained"
              color="primary"
              type="submit"
              disabled={!text.length}
            >
              追加
            </Button>
            <Button
              className="all-delete-buton"
              variant="contained"
              color="secondary"
              disabled={!todos.find(todo => todo.done)}
              onClick={() => {
                handleDeleteDone();
              }}
            >
              完了を一括削除
            </Button>
          </form>
        </div>
        <div className="filter-block">
          <ButtonGroup>
            <Button onClick={() => setFilter('all')} disabled={filter === 'all'}>
              全て
            </Button>
            <Button onClick={() => setFilter('done')} disabled={filter === 'done'}>
              未完了
            </Button>
            <Button onClick={() => setFilter('notDone')} disabled={filter === 'notDone'}>
              完了
            </Button>
          </ButtonGroup>
        </div>
        <div className="list-block">
          {filteredTodos.length ? (
            filteredTodos.map((todo, i) => (
              <List>
                <ListItem dense button key={i.toString()} onClick={handleDone(todo.id)}>
                  <Checkbox
                    tabIndex={-1}
                    disableRipple
                    checked={todo.done}
                    onChange={() => {
                      handleDone(todo.id);
                    }}
                  />
                  <ListItemText className={todo.done && 'done'} primary={todo.text} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={handleDelete(todo.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ))
          ) : (
            <p>タスクがありません</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
