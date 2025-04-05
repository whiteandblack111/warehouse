import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import styles from './tovar_warehouse.module.css'
import { Context } from '../../index';

const Tovar_warehouse = ({ tovar }) => {


    return (
        <div className={styles.container}>

            <div className={`${styles.item} ${styles.id}`}>{tovar.id}</div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.itemFoto}`}>
                <img
                    className={styles.photo_for_tovars}
                    src={`http://localhost:7000/${tovar.photo_for_tovars[0].img_name}`}
                    alt="Фото товара"
                />
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.Manufacturer_ID}`}>
                {tovar.manufacturer_ID}
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.barcode}`}>
                <div className={styles.barcode_box}>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                    <div className={styles.barcode_box_item}><p>PG 2042930264167</p></div>
                </div>
                <div className={styles.line_mini} ></div>
                <div className={styles.barcode_download_box}>
                    <button className={styles.barcode_download_btn}>Загрузить</button>
                </div>
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.name}`}>
                {tovar.name}
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.quantity}`}>
                {tovar.quantity}
            </div>

        </div>
    )

}

export default observer(Tovar_warehouse);