import { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';
import { auth_routes, guest_routes } from "../../routes/routes";
import { Context } from '../../index';

import { TASKS_PATH } from '../../utils/routes_constants';



const APP_ROUTER = () => {

    const { user_store } = useContext(Context)

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