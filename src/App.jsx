import React from 'react';
import {
  IconButton, Typography, TextField, List, ListItem, ListItemText,
} from '@material-ui/core';
import './App.scss';

function App() {
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
        <form>
          <TextField variant="outlined" placeholder="タスクを追加する" />
        </form>
      </div>
      <div>
        <List>
          <ListItem button>
            <ListItemText primary="sample" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default App;
