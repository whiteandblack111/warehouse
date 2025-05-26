import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from "./logout_btn.module.css"
import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

import { Context } from '../../../../index';

const Logout_btn = (props) => {

    const { user_store } = useContext(Context)

    console.log(props.children);

    return (

        
       

        <div className={styles.container}>
            
                <button  className={styles.link} >
                    <TbLogout />
                </button>
    

        </div>


    )
}

export default Logout_btn

