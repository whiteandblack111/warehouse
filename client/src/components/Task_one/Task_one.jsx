import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './task_one.module.css'
import { Context } from '../../index';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import Sticker_warehouse from '../UI/Sticker_warehouse/Sticker_warehouse';
import { TiPrinter } from "react-icons/ti";

import { BsFillBoxSeamFill } from "react-icons/bs";
import Cartons_required_box from '../PAGE_COMPONENTS/Cartons_required_box/Cartons_required_box';
import Update_executor_popup from '../POPUPs/Update_executor/Update_executor_popup';




const Task_one = ({ task }) => {
    const [taskSort_tovars, setTaskSort_tovars] = useState([])
    const [executor, setExecutor] = useState("")
    const [isOpen_update_executor_popup, setIsOpen_update_executor_popup] = useState(false)

    const { sticker_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { user_store } = useContext(Context);


    const executor_ref = useRef(null);
    const executor_popup_ref = useRef(null);

    useEffect(() => {
        setExecutor(task.executor)

    }, [])

    const handler_hover_executorStatus = (e) => {
        const executor_field = executor_ref.current;
        // setExecutor("назначить")


        executor_field.classList.add('headingItem_value_hover');
    }

    const handler_leave_executorStatus = (e) => {
        const executor_field = executor_ref.current;
        setExecutor(task.executor)
        executor_field.classList.remove('headingItem_value_hover');
    }

    const update_executor_popup_open = async (e) => {
        await user_store.get_all_workers();

        setIsOpen_update_executor_popup(true)
    }

    const print_sticker = () => {
    }


    return (

        <div className={styles.container}>

            <div className={styles.heading}
            >
                <div className={`${styles.headingItem} ${styles.task_id_head}`}>№</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.shop_name}`}>Магазин</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.author_build}`}>Автор сборки</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.task_time}`}>Дата сборки</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.executor_head}`}>Сборщик</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.statusWork}`}>Статус готовности</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.quantity_head}`}>Кол-во позиций</div>
            </div>

            <div className={styles.heading}
            >
                <div className={`${styles.headingItem_value} ${styles.task_id_value}`}>{task.id}</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem_value} ${styles.shop_name}`}>{task.shop_name}</div>
                <div className={styles.line}></div>

                {task.userId === "не определён" || task.userId === null
                    ? <div className={`${styles.headingItem_value} ${styles.author_warning} .no-select`}>{"не определён"}</div>
                    : <div className={`${styles.headingItem_value} ${styles.author_build} .no-select`}>{task.userId}</div>
                }
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.task_time_value}`}>
                    {task.start_build}
                    <div className={styles.line}></div>
                    {task.end_build}
                </div>
                <div className={styles.line} ></div>



                {   user_store.isAdmin?
                    <div
                        onMouseEnter={(e) => { handler_hover_executorStatus(e) }}
                        onMouseLeave={(e) => { handler_leave_executorStatus(e) }}
                        onClick={(e) => { update_executor_popup_open() }}
                        ref={executor_ref}
                        className={executor === "не назначен" || executor === "назначить"
                            ? `${styles.headingItem_value} ${styles.executor_warning_text}  `
                            : `${styles.headingItem_value} ${styles.executor_value}`
                        }

                        // className={
                        //     `${styles.headingItem_value} ${styles.executor_value}`
                        // }
                    >
                        {executor}


                        <Update_executor_popup
                            ref={executor_popup_ref}
                            task_id={task.id}
                            isOpen_update_executor_popup={isOpen_update_executor_popup}
                            setIsOpen_update_executor_popup={setIsOpen_update_executor_popup}

                        ></Update_executor_popup>
                    </div>
                    :
                    <div
                        className={executor === "не назначен"
                            ? `${styles.headingItem_value} ${styles.executor_warning_text}`
                            : `${styles.headingItem_value} ${styles.executor_value}`
                        }
                    >
                        {executor}


                        <Update_executor_popup
                            ref={executor_popup_ref}
                            task_id={task.id}
                            isOpen_update_executor_popup={isOpen_update_executor_popup}
                            setIsOpen_update_executor_popup={setIsOpen_update_executor_popup}

                        ></Update_executor_popup>
                    </div>
                }




                <div className={styles.line} ></div>

                {
                    task.statusWork === "в очереди" ?
                        <div className={`${styles.headingItem_value} ${styles.statusWork_warning}`}>{task.statusWork}</div>
                        :
                        <div className={`${styles.headingItem_value} ${styles.statusWork}`}>{task.statusWork}</div>
                }

                <div className={styles.line} ></div>

                < div className={`${styles.headingItem_value} ${styles.quantity}`}>
                    {task.tovar_for_tasks.length
                        ?
                        task.tovar_for_tasks.length
                        :
                        0
                    }
                </div>
            </div>

            <div className={styles.container_tasks}>

                <div className={styles.task_name_container}>

                    <div className={`${styles.headingItem} ${styles.task_name}`}>
                        Название поставки
                    </div>
                    <div className={`${styles.headingItem_value} ${styles.task_name_value}`}>
                        {task.task_name}
                    </div>
                </div>
                {
                    task.tovar_for_tasks.map((tovar_task, index) => {
                        return <div
                            key={tovar_task.id}
                            className={
                                tovar_task.status === 'changed'
                                    ? `${styles.task_container} ${styles.task_container_changed}`
                                    : styles.task_container

                            }>

                            <div className={`${styles.item} ${styles.task_id_value} ${styles.clip_text}`}>{index + 1}</div>
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
                                    <div className={`${styles.item} ${styles.barcode_text} ${styles.clip_text}`}>
                                        {tovar_task.barcode}
                                    </div>

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
                                task_id={task.id}
                                tovar_task={tovar_task}
                            ></Cartons_required_box>


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