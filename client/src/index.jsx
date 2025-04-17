import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User_store from "./store/User_store";
import Task_store from "./store/Task_store";
import Tovar_forTask_store from "./store/Tovar_forTask_store";
import Tovar_store from './store/Tovar_store';
import Sticker_store from './store/Sticker_store';
import Order_store from './store/Order_store';




const user_store = new User_store();
const task_store = new Task_store();
const tovar_forTask_store = new Tovar_forTask_store();
const tovar_store = new Tovar_store();
const sticker_store = new Sticker_store();
const order_store = new Order_store();

export const Context = createContext({
  user_store,
  task_store,
  tovar_store,
  sticker_store,
  order_store,
  tovar_forTask_store
})

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Context.Provider value={
    {
      user_store,
      task_store,
      tovar_forTask_store,
      tovar_store,
      sticker_store,
      order_store
    }
  }>
    <App />
  </Context.Provider>
);
