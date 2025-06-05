import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User_store from "./store/User_store";
import Task_store from "./store/Task_store";
import Tovar_forTask_store from "./store/Tovar_forTask_store";
import Tovar_store from './store/Tovar_store';
import Sticker_store from './store/Sticker_store';
import Order_store from './store/Order_store';
import Interface_store from './store/Interface_store';
import BoxTask_store from './store/BoxTask_store';
import Bot_messages_store from './store/Bot_messages_store';
import { StrictMode } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';




const user_store = new User_store();
const task_store = new Task_store();
const tovar_forTask_store = new Tovar_forTask_store();
const tovar_store = new Tovar_store();
const sticker_store = new Sticker_store();
const order_store = new Order_store();
const interface_store = new Interface_store();
const boxTask_store = new BoxTask_store();
const bot_messages_store = new Bot_messages_store();

export const Context = createContext({
  user_store,
  task_store,
  tovar_store,
  sticker_store,
  order_store,
  tovar_forTask_store,
  interface_store,
  boxTask_store,
  bot_messages_store
})

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Context.Provider StrictMode={{ enableStaticRendering: false }} value={

    {
      user_store,
      task_store,
      tovar_forTask_store,
      tovar_store,
      sticker_store,
      order_store,
      interface_store,
      boxTask_store,
      bot_messages_store
    }
  }>

      <App />


  </Context.Provider>
);
