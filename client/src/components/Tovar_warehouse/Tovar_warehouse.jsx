import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import styles from './tovar_warehouse.module.css'
import { Context } from '../../index';
import { FaDownload } from "react-icons/fa";
import Sticker_warehouse from '../UI/Sticker_warehouse/Sticker_warehouse';

const Tovar_warehouse = ({ tovar }) => {

    const { sticker_store } = useContext(Context);
    const { tovar_store } = useContext(Context);

    const open_close_create_sticker = () => {
        if (sticker_store.isCreate) {
            sticker_store.setIsCreate(false)
            
            return
        }

        tovar_store.setTovar(tovar)
        sticker_store.setIsCreate(true)

        return
    }

    return (
        <div className={styles.container}>

            <div className={`${styles.item} ${styles.id} ${styles.clip_text}`}>{tovar.id}</div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.itemFoto}`}>
                <img
                    className={styles.photo_for_tovars}
                    src={`http://localhost:7000/${tovar.photo_for_tovars[0].img_name}`}
                    alt="Фото товара"
                />
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.Manufacturer_ID} ${styles.clip_text}`}>
                {tovar.manufacturer_ID === ''
                    ? "Не указан"
                    : tovar.manufacturer_ID
                }
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.barcode}`}>
                <div className={styles.barcode_box}>
                    {
                        tovar.stickers.map((sticker) =>
                            <Sticker_warehouse sticker={sticker} />)
                    }
                </div>

                <div className={styles.line_mini} ></div>

                <div className={styles.barcode_download_box}>
                    <button className={`${styles.barcode_download_btn} `}
                        onClick={() => open_close_create_sticker()}
                    >
                        <FaDownload />
                    </button>
                </div>
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.name} ${styles.clip_text}`}>
                {tovar.name}
            </div>
            <div className={styles.line} ></div>

            {
                tovar.quantity < 20 ?
                    <div className={`${styles.item} ${styles.quantity_danger} ${styles.clip_text}`}>{tovar.quantity}</div>
                    : tovar.quantity >= 20 && tovar.quantity <= 50 ?
                        <div className={`${styles.item} ${styles.quantity_warning} ${styles.clip_text}`}>{tovar.quantity}</div>
                        : <div className={`${styles.item} ${styles.quantity_good} ${styles.clip_text}`}>{tovar.quantity}</div>
            }


        </div>
    )

}

export default observer(Tovar_warehouse);