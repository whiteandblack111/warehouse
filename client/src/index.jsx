import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User_store from "./store/User_store";
import Task_store from "./store/Task_store";




const user_store = new User_store();
const task_store = new Task_store();

export const Context = createContext({
  user_store,
  task_store
})

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Context.Provider value={
    {
      user_store,
      task_store
    }
  }>
    <App />
  </Context.Provider>
);
