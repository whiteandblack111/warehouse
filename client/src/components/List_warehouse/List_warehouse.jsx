import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import styles from './list_warehouse.module.css'
import { Context } from '../../index';
import Tovar_warehouse from '../Tovar_warehouse/Tovar_warehouse';
import Tovar_Service from '../../services/Tovar_Service';

const List_warehouse = () => {

    useEffect(() => {
        getAll_tovars_warehouse();
    }, [])

    const { tovar_store } = useContext(Context);

    async function getAll_tovars_warehouse() {
        await tovar_store.getAll_tovars_warehouse();

    }


    return (
        <div
            className={styles.container}

        >
            <div className={styles.heading}>
                <div className={`${styles.headingItem} ${styles.id}`}>№</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.itemFoto}`}>Фото</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.Manufacturer_ID}`}>Manufacturer_ID</div>
                <div className={styles.line} ></div>


                <div className={`${styles.headingItem} ${styles.barcode}`}>Штрих_код</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.name}`}>Название</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.quantity}`}>Кол-во</div>
            </div>
            {
                tovar_store.allTovars.map((tovar) => {
                    return <Tovar_warehouse
                        key={tovar.id}
                        tovar={tovar}
                    ></Tovar_warehouse>
                })
            }

        </div>
    )



}

export default observer(List_warehouse);