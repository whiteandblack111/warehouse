import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';


const REGISTRATION_PAGE = () => {
    const { store } = useContext(Context)
    
    return (
        <div className="REGISTRATION_PAGE">
            <h1>{store.isAuth ? `Пользователь ${store.user.email} авторизован` : 'Авторизуйся'}</h1>
            <button onClick={() => store.logout()} >Выйти</button><div>
            </div>

         
        </div>
    )
};

export default REGISTRATION_PAGE
