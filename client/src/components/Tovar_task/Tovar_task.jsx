import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../../index';

import { observer } from "mobx-react-lite"
import styles from "./tovar_task.module.css"
import { TiPrinter } from "react-icons/ti"
import Sticker_warehouse from "../UI/Sticker_warehouse/Sticker_warehouse"
import Cartons_required_box from "../PAGE_COMPONENTS/Cartons_required_box/Cartons_required_box"
import ChangeStatus_tovarTask from "../POPUPs/ChangeStatus_tovarTask/ChangeStatus_tovarTask"

import { BsFillBoxSeamFill } from "react-icons/bs";
import { BsFillBox2Fill } from "react-icons/bs";


const Tovar_task = ({ tovar_task, index }) => {

    const [isOpen_сhangeStatus_tovarTask_popup, setIsOpen_сhangeStatus_tovarTask_popup] = useState(false);


    const { sticker_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { tovar_forTask_store } = useContext(Context);

    const сhangeStatus_tovarTask_OPENpopup = () => {

        setIsOpen_сhangeStatus_tovarTask_popup(true)
    }



    const print_sticker = () => {
    }

    return (
        <div
            key={tovar_task.id}
            className={
                tovar_task.status === 'changed'
                    ? `${styles.tovar_task_container} ${styles.tovar_task_container_changed}`
                    : tovar_task.status === 'done' ?
                        `${styles.tovar_task_container} ${styles.tovar_task_container_done}`
                        : tovar_task.status === 'stop' ?
                            `${styles.tovar_task_container} ${styles.tovar_task_container_stop}`
                            : styles.tovar_task_container

            }>

            <div className={`${styles.item} ${styles.task_id_value} ${styles.clip_text}`}>{index + 1}</div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.itemFoto}`}>


                <img
                    className={styles.photo_for_tovars}
                    src={`http://localhost:7000/${tovar_task.tovar_for_warehouse.photo_for_tovars[0].img_name}`}
                    alt="Фото товара"
                />

            </div>
            <div className={styles.line} ></div>

            {/* <div className={`${styles.item} ${styles.warehouse_ID} ${styles.clip_text}`}>
                                        {tovar_task.warehouse_ID}
                                    </div>
                                    <div className={styles.line} ></div> */}

            <div className={`${styles.item} ${styles.tovar_name} ${styles.clip_text}`}>
                {tovar_task.name}
            </div>
            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.barcode_info}`}>
                <div className={styles.barcode_box}>

                    <Sticker_warehouse className={styles.sticker} sticker={tovar_task.sticker} />

                    {/* <div className={`${styles.item} ${styles.barcode_text} ${styles.clip_text}`}>
                                                {tovar_task.barcode}
                                            </div> */}

                </div>

                <div className={styles.line_mini} ></div>

                <div className={styles.barcode_download_box}>
                    <button className={`${styles.barcode_download_btn} `}
                        onClick={() => print_sticker()}
                    >
                        <TiPrinter />
                    </button>
                </div>
            </div>

            <div className={styles.line} ></div>

            <Cartons_required_box
                key={tovar_task.id}
                task_id={tovar_task.taskId}
                tovar_task={tovar_task}
            ></Cartons_required_box>


            <div className={styles.line} ></div>


            <div className={styles.box_number}>
                <div
                    className={
                        tovar_task.status === 'done'
                            ? `${styles.BsFillBoxSeamFill} ${styles.green}`
                            : `${styles.BsFillBoxSeamFill} `
                    }

                    onClick={сhangeStatus_tovarTask_OPENpopup}
                >
                    {
                        tovar_task.quantityBoxes == "0"
                            ? <BsFillBoxSeamFill />
                            :
                            <div>
                                <BsFillBox2Fill />
                                <div
                                    className={styles.number}
                                >
                                    {tovar_task.quantityBoxes}
                                </div>
                            </div>
                    }
                </div>

                <ChangeStatus_tovarTask
                    tovar_task={tovar_task}
                    isOpen={isOpen_сhangeStatus_tovarTask_popup}
                    setIsOpen={setIsOpen_сhangeStatus_tovarTask_popup}
                ></ChangeStatus_tovarTask>
            </div>
        </div>
    )

}

export default observer(Tovar_task)