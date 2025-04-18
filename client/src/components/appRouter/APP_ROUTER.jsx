import React, { useContext, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Routes, Route, Redirect, useNavigate } from 'react-router-dom';
import { auth_routes, guest_routes } from "../../routes/routes";

import { Context } from '../../index';

import { TASKS_PATH } from '../../utils/routes_constants';



const APP_ROUTER = () => {

    const { user_store } = useContext(Context)
    const navigate = useNavigate()



    // console.log("user_store.isAuth===>", user_store.isAuth)
    // console.log("user_store.isAdmin===>", user_store.isAdmin)
    // console.log("user_store.isWorker===>", user_store.isWorker)
    
   
    return (
        <Routes>

            {!user_store.isAuth && guest_routes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {user_store.isAuth && auth_routes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}

        </Routes>
    )
}


export default observer(APP_ROUTER);