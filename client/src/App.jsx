import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Context } from './index';
import { observer } from 'mobx-react-lite';
import User_Service from './services/User_Service';
import APP_ROUTER from './components/appRouter/APP_ROUTER';


import Header from './components/PAGE_COMPONENTS/Header/Header';
import './App.css'
import Login_form from './components/FORMS/Login_form/Login_form';
import LOGIN_PAGE from './pages/guests/login/LOGIN_PAGE';
import Loader from "./components/PAGE_COMPONENTS/Loader/Loader";

const App = () => {
  const { user_store } = useContext(Context);
  const { task_store } = useContext(Context);
  const { tovar_store } = useContext(Context);
  const { tovar_forTask_store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      user_store.checkAuth()
    }
  }, []);



  // if (user_store.isLoading 
  //   || task_store.isLoading 
  //   || tovar_store.isLoading 
  //   || tovar_forTask_store.isLoading ) {

  //   return (
  //      <Loader></Loader>
  //   )
  // }

  if (!user_store.isAuth) {
    return (
      <BrowserRouter>
        <LOGIN_PAGE></LOGIN_PAGE>
      </BrowserRouter>
    )
  }


  return (
    <BrowserRouter>
      <Header></Header>
      <APP_ROUTER></APP_ROUTER>
    </BrowserRouter>

  );



}

export default observer(App);
