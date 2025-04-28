import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from "./login_btn.module.css"
import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

import { Context } from '../../../..';

const Login_btn = (props) => {

    const { user_store } = useContext(Context)

    return (

        
       

        <div className={styles.container}>
            
            {props.children === "Войти" ?
                <NavLink className={styles.link} to={props.path}>
                    <FaRegUser />
                </NavLink>
                :
                <NavLink  className={styles.link} onClick={()=>{user_store.logout()}} to={props.path}>
                    <TbLogout />
                </NavLink>
            }

        </div>


    )
}

export default Login_btn

