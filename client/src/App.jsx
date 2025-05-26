import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Context } from './index';
import { observer } from 'mobx-react-lite';
import User_Service from './services/User_Service';
import APP_ROUTER from './components/appRouter/APP_ROUTER';


import Header from './components/PAGE_COMPONENTS/Header/Header';
import './App.css'
import LOGIN_PAGE from './pages/guests/login/LOGIN_PAGE';

const App = () => {
  const { user_store } = useContext(Context);
  const { interface_store } = useContext(Context);


  // Отслеживаем изменение размера экрана здесь, моментально реагируя на любые его изменения
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      return interface_store.setIsMobile(true);
    }

    return interface_store.setIsMobile(false);
    // setIsMobile(window.innerWidth < 768);

  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      user_store.checkAuth()
    }

    if (window.innerWidth <= 768) {
      return interface_store.setIsMobile(true);
    }

    window.addEventListener('resize', handleResize);
    // Непременно удаляем обработчик, чтобы предотвратить утечку памяти
    return () => window.removeEventListener('resize', handleResize);

  }, []);


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
