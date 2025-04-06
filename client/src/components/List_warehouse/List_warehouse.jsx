import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import styles from './list_warehouse.module.css'
import { Context } from '../../index';
import Tovar_warehouse from '../Tovar_warehouse/Tovar_warehouse';
import Tovar_Service from '../../services/Tovar_Service';
import Stickers_form from '../FORMS/Stickers_form/Stickers_form';

const List_warehouse = () => {

    const { sticker_store } = useContext(Context);

    useEffect(() => {
        getAll_tovars_warehouse();
    }, [])

    const { tovar_store } = useContext(Context);

    async function getAll_tovars_warehouse() {
        await tovar_store.getAll_tovars_warehouse();

    }


    const arrayTest = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, ,]

    const tovarTest = {
        photo_for_tovars: [
            {
                img_name: "хуета"
            }

        ]
        ,
        manufacturer_ID: "хз",
        barcode: "хз",
        name: "хз",
        quantity: "х1000з"
    }


    return (
        <div
            className={styles.container}

        >
            {sticker_store.isCreate
                ? <Stickers_form></Stickers_form>
                : <div></div>
            }


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
                // tovar_store.allTovars.map((tovar) => {
                //     return <Tovar_warehouse
                //         key={tovar.id}
                //         tovar={tovar}
                //     ></Tovar_warehouse>
                // })

                // arrayTest.map((tovar) => {
                //     return <Tovar_warehouse
                //     tovar={tovarTest}
                //     ></Tovar_warehouse>
                // })
                <Tovar_warehouse
                    tovar={tovarTest}
                ></Tovar_warehouse>


            }



        </div>
    )



}

export default observer(List_warehouse);