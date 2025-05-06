import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import styles from './tovar_warehouse.module.css'
import { Context } from '../../index';
import { FaDownload } from "react-icons/fa";
import Sticker_warehouse from '../UI/Sticker_warehouse/Sticker_warehouse';
import Glaassmorphism_btn from '../UI/BUTTONS/Glaassmorphism_btn/Glaassmorphism_btn';
import Plus_btn from '../UI/BUTTONS/Plus_btn/Plus_btn';
import Minus_btn from '../UI/BUTTONS/Minus_btn/Minus_btn';
import Open_close_btn from '../UI/BUTTONS/Open_close_btn/Open_close_btn';
import Update_quantityTovar_popup from '../POPUPs/Update_quantityTovar/Update_quantityTovar_popup';

const Tovar_warehouse = ({ tovar }) => {
    const [current_URL, setCurrent_URL] = useState('')

    const { sticker_store } = useContext(Context);
    const { tovar_store } = useContext(Context);
    const { user_store } = useContext(Context)

    useEffect(() => {
        get_current_host_url()
    }, [])

    const get_current_host_url = () => {


        if (typeof window !== 'undefined') {
            console.log("typeof window:::", typeof window);
            console.log(" window:::", window);

            let currentUrl = window.location.href.split(':')[1];
            let http = window.location.href.split(':')[0];
            currentUrl = currentUrl.split('//')[1];
            currentUrl = currentUrl.split('/')[0];

            let build_url;
            if (currentUrl === 'localhost') {
                setCurrent_URL(`${http}://localhost:7000/`)
                build_url = `${http}://localhost:7000/`
            }

            if (currentUrl !== 'localhost') {
                setCurrent_URL(`${http}://${currentUrl}/files/`)
                build_url = `${http}://${currentUrl}/files/`
            }

            setCurrent_URL(build_url)
        
            return build_url
        }
    }

    const open_close_create_sticker = () => {
        if (sticker_store.isCreate) {
            sticker_store.setIsCreate(false)

            return
        }

        tovar_store.setTovar(tovar)
        sticker_store.setIsCreate(true)

        return
    }

    const { interface_store } = useContext(Context);
    const open_addTovar_forTask_popup = () => {
        tovar_store.setTovar(tovar)

        interface_store.setIsOpen_addTovar_forTask(true)
    }

    const [isOpen_update_quantity_popup, setIsOpen_update_quantity_popup] = useState(false);
    const open_close_quantity_update_popup = () => {

        if (isOpen_update_quantity_popup) {
            setIsOpen_update_quantity_popup(false);
            return
        }
        setIsOpen_update_quantity_popup(true)

    }




    return (
        <div className={styles.container}>
            <div className={styles.fon}></div>

            <div className={`${styles.item} ${styles.id} ${styles.clip_text}`}>{tovar.id}</div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.itemFoto}`}>
                {current_URL
                    ?
                    <img
                        className={styles.photo_for_tovars}
                        src={`${current_URL}${tovar.photo_for_tovars[0].img_name}`}
                        alt="Фото товара"
                    />
                    :
                    <></>

                }

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
                            <Sticker_warehouse
                                key={sticker.id}
                                sticker={sticker}
                            />)
                    }
                </div>

                {user_store.isAdmin
                    ?
                    <div className={styles.line_mini} ></div>
                    :
                    <></>

                }
                {user_store.isAdmin
                    ?
                    <div className={styles.barcode_download_box}>
                        <button className={`${styles.barcode_download_btn} `}
                            onClick={() => open_close_create_sticker()}
                        >
                            <FaDownload />
                        </button>
                    </div>
                    :
                    <></>

                }


            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.box_name}`}>

                <div className={`${styles.item} ${styles.name} ${styles.clip_text}`}>
                    {tovar.name}
                </div>
                {
                    user_store.isAdmin
                        ?
                        <Glaassmorphism_btn
                            onClick={open_addTovar_forTask_popup}
                        >в поставку</Glaassmorphism_btn>
                        :
                        <></>
                }


            </div>

            <div className={styles.line} ></div>

            <div className={styles.quantity_box}>

                {
                    tovar.quantity < 20 ?
                        <div className={`${styles.item} ${styles.quantity_danger} ${styles.clip_text} ${styles.quantity_value}`}>{tovar.quantity}</div>
                        : tovar.quantity >= 20 && tovar.quantity <= 50 ?
                            <div className={`${styles.item} ${styles.quantity_warning} ${styles.clip_text} ${styles.quantity_value}`}>{tovar.quantity}</div>
                            : <div className={`${styles.item} ${styles.quantity_good} ${styles.clip_text} ${styles.quantity_value}`}>{tovar.quantity}</div>
                }

                {user_store.isAdmin
                    ?
                    <>
                        <Update_quantityTovar_popup
                            warehouse_or_task="warehouse"
                            tovar={tovar}
                            isOpenPopup={isOpen_update_quantity_popup}
                            callback_active_func={open_close_quantity_update_popup}
                        ></Update_quantityTovar_popup>

                        <Open_close_btn
                            key={tovar.id}
                            onClick={open_close_quantity_update_popup}
                        ></Open_close_btn>

                    </>
                    :
                    <></>

                }
            </div>




        </div>
    )

}

export default observer(Tovar_warehouse);