import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from "./header_btn.module.css"
import { Context } from '../../../index';
import { observer } from 'mobx-react-lite';

const Header_btn = (props) => {
    const [routActive, setRoutActive] = useState(false)

    useEffect(()=>{

        return () => {
            setRoutActive(false)
        }
    },[routActive])



    return (
        <div className={styles.container + " " + styles.dropdown}>
            <NavLink
                // className={({isActive}) => setRoutActive(true)}
                className={`${styles.link} `}

                to={props.path}>

                {props.children}
            </NavLink>
            <div className={styles.dropdown_content}>
                <a className={styles.dropdown_a} href="#">Список</a>
                <a className={styles.dropdown_a} href="#">Создать</a>
                <a className={styles.dropdown_a} href="#">Поиск</a>
            </div>
        </div>
    )
}

export default observer(Header_btn)

