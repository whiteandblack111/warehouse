import React, { useContext, useEffect, useState, useRef } from 'react';
import { observer } from "mobx-react-lite"
import styles from './list_warehouse.module.css'
import { Context } from '../../index';
import Tovar_warehouse from '../Tovar_warehouse/Tovar_warehouse';
import Create_Stickers_form from '../FORMS/Stickers_form/Create_Stickers_form';
import Loader from '../PAGE_COMPONENTS/Loader/Loader';

const List_warehouse = () => {

    const { sticker_store } = useContext(Context);
    const { tovar_store } = useContext(Context);


    

    return (
        <div>
            <div className={styles.heading}>
                <div className={`${styles.headingItem} ${styles.id}`}>№</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.itemFoto}`}>Фото</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.Manufacturer_ID}`}>Manufacturer_ID</div>
                <div className={styles.line} ></div>


                <div className={`${styles.headingItem} ${styles.barcode}`}>Стикеры</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.name}`}>Название</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.quantity}`}>Кол-во</div>
            </div>
            <div
                className={styles.container}
            >

                {sticker_store.isCreate
                    ? <Create_Stickers_form></Create_Stickers_form>
                    : <div></div>
                }

                {
                    tovar_store._allTovars.map((tovar) => {
                        return <Tovar_warehouse
                            key={tovar.id}
                            tovar={tovar}
                        ></Tovar_warehouse>
                    })

                }

            </div>
        </div>
    )



}

export default observer(List_warehouse);