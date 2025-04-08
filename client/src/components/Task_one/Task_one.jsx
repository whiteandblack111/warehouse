import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './task_one.module.css'
import { Context } from '../../index';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import Sticker_warehouse from '../UI/Sticker_warehouse/Sticker_warehouse';
import { TiPrinter } from "react-icons/ti";

import { BsFillBoxSeamFill } from "react-icons/bs";
import Update_popup from '../POPup/Update_popup';


const Task_one = ({ task }) => {

    const { sticker_store } = useContext(Context);
    const { task_store } = useContext(Context);



    const print_sticker = () => {

    }

    console.log("Task_one task=========>>> ", task)



    return (

        <div className={styles.container}>

            

            <div className={styles.heading}
            >
                <div className={`${styles.headingItem} ${styles.task_id_head}`}>№</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.task_name}`}>Название</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.shop_name}`}>Магазин</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.author_build}`}>Автор сборки</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.executor_head}`}>Сборщик</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.statusWork}`}>Статус готовности</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.quantity_head}`}>Кол-во позиций</div>
            </div>

            <div className={styles.heading}
            >
                <div className={`${styles.headingItem_value} ${styles.task_id}`}>{task.id}</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem_value} ${styles.task_name}`}>{task.task_name}</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem_value} ${styles.shop_name}`}>{task.shop_name}</div>
                <div className={styles.line}></div>

                {task.userId === "не определён" || task.userId === null
                    ? <div className={`${styles.headingItem_value} ${styles.author_warning}`}>{"не определён"}</div>
                    : <div className={`${styles.headingItem_value} ${styles.author_build}`}>{task.userId}</div>
                }


                <div className={styles.line}></div>

                {
                    task.executor === "не назначен" ?
                        <div className={`${styles.headingItem_value} ${styles.executor_warning}`}>{task.executor}</div>
                        : <div className={`${styles.headingItem_value} ${styles.executor}`}>{task.executor}</div>

                }

                <div className={styles.line} ></div>

                {
                    task.statusWork === "в очереди" ?
                        <div className={`${styles.headingItem_value} ${styles.statusWork_warning}`}>{task.statusWork}</div>
                        :
                        <div className={`${styles.headingItem_value} ${styles.statusWork}`}>{task.statusWork}</div>
                }

                <div className={styles.line} ></div>

                <div className={`${styles.headingItem_value} ${styles.quantity}`}>{task.tovar_for_tasks.length}</div>
            </div>

            <div className={styles.container_tasks}>
                {
                    task.tovar_for_tasks.map((tovar_task) => {
                        return <div className={styles.task_container}>

                            <div className={`${styles.item} ${styles.task_id} ${styles.clip_text}`}>{tovar_task.id}</div>
                            <div className={styles.line} ></div>

                            <div className={`${styles.item} ${styles.itemFoto}`}>
                                {/* <img
                    className={styles.photo_for_tovars}
                    src={`http://localhost:7000/${task.photo_for_tovars[0].img_name}`}
                    alt="Фото товара"
                /> */}

                                <img
                                    className={styles.photo_for_tovars}
                                    src={`http://localhost:7000/cecc7192-1d25-4c10-be5f-09aca96198fa.jpg `}
                                    alt="Фото товара"
                                />

                            </div>
                            <div className={styles.line} ></div>

                            <div className={`${styles.item} ${styles.warehouse_ID} ${styles.clip_text}`}>
                                {tovar_task.warehouse_ID}
                            </div>
                            <div className={styles.line} ></div>

                            <div className={`${styles.item} ${styles.tovar_name} ${styles.clip_text}`}>
                                {tovar_task.name}
                            </div>
                            <div className={styles.line} ></div>

                            <div className={`${styles.item} ${styles.barcode_info}`}>
                                <div className={styles.barcode_box}>
                                    <img
                                        className={styles.photo_for_barcode}
                                        src={`http://localhost:7000/barcode.png `}
                                        alt="стикер"
                                    />
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
                            <div className={`${styles.item} ${styles.cartons_required_box} ${styles.clip_text}`}>
                                <div className={styles.column}>
                                    <p>
                                        требуется
                                    </p>
                                    <p>
                                        {tovar_task.cartons_required}
                                    </p>
                                </div>

                                <div className={styles.line_mini} ></div>
                                <div className={styles.column}>
                                    <p>
                                        имеется
                                    </p>
                                    <p>
                                        {tovar_task.cartons_found}
                                    </p>
                                </div>
                                <Update_popup></Update_popup>
                            </div>


                            <div className={styles.line} ></div>


                            <div className={`box_number`}>
                                <BsFillBoxSeamFill className={styles.BsFillBoxSeamFill} />
                            </div>


                        </div>
                    })

                }
            </div>
        </div>
    )
}

export default observer(Task_one)