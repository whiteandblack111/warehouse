import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from './header.module.css'
import Header_btn from "../../UI/Header_btn/Header_btn";

import { ADMIN_TASK_LIST_PATH, ADMIN_WAREHOUSE_PATH } from "../../../utils/routes_constants";
import Login_btn from "../../UI/Login_btn/Login_btn";

import { LOGIN_PATH } from "../../../utils/routes_constants";
import { Context } from '../../../index';

const Header = () => {

    const [currentRout, setCurrentRout] = useState('')

    let location = useLocation();
    let navigate = useNavigate();

    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const { user_store } = useContext(Context);
  




    return (
        <header className={styles.header}>
            <NavLink to="/" style={{ textDecoration: 'none', display: "flex", alignItems: "center" }}>
                <div className={`${styles.logo}`}>
                    <h3 className={`${styles.logo_text}`}>Ware</h3>
                    <img
                        className={styles.logoimg}
                        src={window.location.origin + '/img/logo2.png'}

                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        alt="логотип"
                    />
                    <h3 className={`${styles.logo_text}`}>House</h3>
                </div>
            </NavLink>


            <nav className={`${styles.nav_panel}`}>
                <Header_btn
                    className={splitLocation[1] === "" ? `${styles.routActive}` : ""}
                    path={ADMIN_TASK_LIST_PATH}
                >Заказы
                </Header_btn>

                <Header_btn path={ADMIN_TASK_LIST_PATH}>Поставки</Header_btn>
                <Header_btn path={ADMIN_WAREHOUSE_PATH}>Склад</Header_btn>

            </nav>

            <div className={styles.auth_box}>
                {!user_store.isAuth ?
                    <Login_btn path={LOGIN_PATH}>Войти</Login_btn>
                    :
                    <Login_btn path={LOGIN_PATH}>Выйти</Login_btn>
                }


            </div>
        </header>
    )
}
export default observer(Header) 