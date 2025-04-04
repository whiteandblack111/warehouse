import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import styles from "./header_btn.module.css"
import { Context } from '../../../index';
import { observer } from 'mobx-react-lite';
import { ADMIN_TASK_LIST_PATH, ADMIN_WAREHOUSE_PATH } from '../../../utils/routes_constants';

const Header_btn = (props) => {
    const [routActive, setRoutActive] = useState(false)

    const { tovar_store } = useContext(Context);
    const { task_store } = useContext(Context);

    let location = useLocation();

    useEffect(() => {

        return () => {
            setRoutActive(false);

        }
    }, [routActive])



    const isAll = () => {
        tovar_store.setIsCreate(false);
        tovar_store.setIsSearch(false);
    }

    const isCreate = () => {
        if (location.pathname === ADMIN_TASK_LIST_PATH) {

        }

        if (location.pathname === ADMIN_WAREHOUSE_PATH) {
            tovar_store.setIsCreate(true);
            tovar_store.setIsSearch(false);
        }

    }

    const isSearch = () => {
        if (location.pathname === ADMIN_WAREHOUSE_PATH) {
            tovar_store.setIsCreate(false);
            tovar_store.setIsSearch(true);
        }
    }



    return (
        <div className={styles.container + " " + styles.dropdown}>
            <NavLink
                // className={({isActive}) => setRoutActive(true)}
                className={`${styles.link} `}

                to={props.path}>

                {props.children}
            </NavLink>
            <div className={styles.dropdown_content}>
                <a
                    className={styles.dropdown_a}
                    onClick={() => { isAll() }}
                >Список</a>

                <a
                    className={styles.dropdown_a}
                    onClick={() => { isCreate() }}
                >Создать</a>


                <a
                    className={styles.dropdown_a}
                    onClick={() => { isSearch() }}
                >Поиск</a>
            </div>
        </div>
    )
}

export default observer(Header_btn)

