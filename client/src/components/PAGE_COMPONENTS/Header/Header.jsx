import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from './header.module.css'
import Header_btn from "./../../../components/UI/BUTTONS/Header_btn/Header_btn"

import { LOGIN_PATH, TASKS_PATH, WAREHOUSE_PATH, ORDERS_PATH } from "../../../utils/routes_constants";
import Login_btn from '../../UI/BUTTONS/Login_btn/Login_btn';

import { Context } from './../../../index';
import Bot_comment_cloud from '../../UI/ALERTS/Bot_messages_cloud/Bot_messages_cloud';
import Bot_shadow_notification from '../../UI/EFFECTS/Bot_shadow_notification/Bot_shadow_notification';

const Header = () => {

    const [currentRout, setCurrentRout] = useState('')

    let location = useLocation();
    let navigate = useNavigate();

    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const { user_store } = useContext(Context);


    useEffect(()=>{
        console.log("user_store.user-=-=-=-> ", user_store.user)
    },[])



    return (
        <header className={styles.header}>
            <NavLink to="/" style={{ textDecoration: 'none', display: "flex", alignItems: "center", padding: "0 40px" }}>
                <div className={`${styles.logo}`}>
                    <h3 className={`${styles.logo_text}`}>Ware</h3>
                    <Bot_shadow_notification></Bot_shadow_notification>
                    <img
                        className={styles.logoimg}
                        src={window.location.origin + '/img/logo3.png'}

                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        alt="логотип"
                    />

                    <h3 className={`${styles.logo_text}`}>House</h3>
                </div>
            </NavLink>

            <Bot_comment_cloud>
            </Bot_comment_cloud>


            <nav className={`${styles.nav_panel}`}>

                <Header_btn
                    className={splitLocation[1] === "" ? `${styles.routActive}` : ""}
                    path={ORDERS_PATH}
                >Заказы
                </Header_btn>

                <Header_btn path={TASKS_PATH}>Поставки</Header_btn>
                <Header_btn path={WAREHOUSE_PATH}>Склад</Header_btn>

            </nav>
            {!user_store.isAuth ?
                <div className={styles.auth_box}>

                    <Login_btn path={LOGIN_PATH}>Войти</Login_btn>

                </div>
                :
                <div className={styles.auth_box}>
                    <div className={styles.user_name}>{user_store.user.firstname}</div>
                    <Login_btn path={LOGIN_PATH}>Выйти</Login_btn>

                </div>
            }

        </header>
    )
}
export default observer(Header) 