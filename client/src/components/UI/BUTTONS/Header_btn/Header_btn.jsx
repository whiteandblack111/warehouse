import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./header_btn.module.css"
import { Context } from './../../../../index';
import { observer } from 'mobx-react-lite';
import {
    ORDERS_PATH,
    TASKS_PATH,
    WAREHOUSE_PATH

} from './../../../../utils/routes_constants';

const Header_btn = (props) => {
    const [routActive, setRoutActive] = useState(false)

    const { tovar_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { order_store } = useContext(Context);

    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {

        return () => {
            setRoutActive(false);

        }
    }, [routActive])



    const isAll = () => {

        if (location.pathname === ORDERS_PATH) {
            order_store.setIsCreate(false);
            order_store.setIsSearch(false);
        }

        if (location.pathname === TASKS_PATH) {
            task_store.setIsCreate(false);
            task_store.setIsSearch(false);
        }

        if (location.pathname === WAREHOUSE_PATH) {
            tovar_store.setIsCreate(false);
            tovar_store.setIsSearch(false);
        }


        // navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
        //     .then(device => device.gatt.connect())
        //     .then(server => {

        //         // Получаем службу аккумулятора…
        //         return server.getPrimaryService('battery_service');
        //     })
        //     .then(service => {
        //         // Получаем характеристику уровня заряда батареи…
        //         return service.getCharacteristic('battery_level');
        //     })
        //     .then(characteristic => {
        //         // Считываем заряд батареи…
        //         return characteristic.readValue();
        //     })
        //     .then(value => {
        //         console.log(`Уровень заряда: ${value.getUint8(0)}`);
        //     })
        //     .catch(error => { console.error(error); });
    }

    const isCreate = () => {
        if (location.pathname === ORDERS_PATH) {
            order_store.setIsCreate(true);
            order_store.setIsSearch(false);
        }

        if (location.pathname === TASKS_PATH) {
            task_store.setIsCreate(true);
            task_store.setIsSearch(false);
        }

        if (location.pathname === WAREHOUSE_PATH) {
            tovar_store.setIsCreate(true);
            tovar_store.setIsSearch(false);
        }

    }

    const isSearch = () => {
        if (location.pathname === ORDERS_PATH) {
            order_store.setIsCreate(false);
            order_store.setIsSearch(true);
        }

        if (location.pathname === TASKS_PATH) {
            task_store.setIsCreate(false);
            task_store.setIsSearch(true);
        }

        if (location.pathname === WAREHOUSE_PATH) {
            tovar_store.setIsCreate(false);
            tovar_store.setIsSearch(true);
        }
    }



    return (
        <div className={styles.container + " " + styles.dropdown}>
            <NavLink

                className={({ isActive }) => (isActive ? `${styles.link_active} ` : `${styles.link}`)}


                to={props.path}>

                {props.children}
            </NavLink>
            <div className={styles.dropdown_content}>


                <a
                    className={styles.dropdown_a}
                    onClick={() => { isCreate() }}
                >Создать</a>


                <a
                    className={styles.dropdown_a}
                    onClick={() => { isSearch() }}
                >Поиск</a>

                <a
                    className={styles.dropdown_a}
                    onClick={() => { isSearch() }}
                >Архив</a>

            </div>
        </div>
    )
}

export default observer(Header_btn)

