import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import Login_form from '../../../components/FORMS/Login_form/Login_form';
import styles from './login_page.module.css'


const LOGIN_PAGE = () => {

    const { user_store } = useContext(Context)

    return (
        <div className={styles.container}>
            <h1 >{user_store.isAuth ? `Пользователь ${user_store._user.email} авторизован` : 'Вход в аккаунт'}</h1>
            <Login_form></Login_form>

        </div>
    )
};

export default observer(LOGIN_PAGE);