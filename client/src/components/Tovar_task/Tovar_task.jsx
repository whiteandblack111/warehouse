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
import Red_btn from '../UI/BUTTONS/Red_btn/Red_btn';
import { MdDeleteForever } from "react-icons/md";
import { statuses_tovar_for_task } from "./../../utils/entity_statuses";
import CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT from '../PAGE_COMPONENTS/CHECKIHG_ACCESS/CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT';
import { HiLockClosed } from "react-icons/hi";


const Tovar_task = ({ tovar_task, index}) => {

    const { user_store } = useContext(Context);
    const { sticker_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { tovar_forTask_store } = useContext(Context);
    const { bot_messages_store } = useContext(Context);


    const [current_URL, setCurrent_URL] = useState('');
    const [isOpen_сhangeStatus_tovarTask_popup, setIsOpen_сhangeStatus_tovarTask_popup] = useState(false);
    const [statusAllowedToDelete, setStatusAllowedToDelete] = useState(() => { return false });


    useEffect(() => {

        if (tovar_task.status === statuses_tovar_for_task.must_be_deleted.value) {
            setStatusAllowedToDelete((pre) => {
                pre = true
                return pre
            })
        }

    }, [statusAllowedToDelete])

    useEffect(() => {
        get_current_host_url()
    }, [])


    const get_current_host_url = () => {


        if (typeof window !== 'undefined') {

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

    const сhangeStatus_tovarTask_OPENpopup = () => {

        setIsOpen_сhangeStatus_tovarTask_popup(true)
    }

    // функция для удаления товара из поставки, 
    // ADMIN только может пометить её как назначенную к удалению 
    // но удалить из базы данных может только WORKER
    const deleteTovar_fromTask = async () => {

        let fomData = {}

        if (user_store.isAdmin) {

            fomData = {
                role: "ADMIN",
                tovar_task_id: tovar_task.id,
                new_status_for_tovar: statuses_tovar_for_task.must_be_deleted.value
            }
            const tovar_task_for_delete = await tovar_forTask_store.deleteTovar_fromTask(fomData);

            const allTasks_mutate = task_store.allTasks.map((task) => {

                if (task.id === tovar_task_for_delete.taskId) {
                    const mutateTask = task.tovar_for_tasks.map((tovar_item) => {
                        if (tovar_item.id === tovar_task_for_delete.id) {
                            tovar_item.status = tovar_task_for_delete.status
                        }
                        return tovar_item
                    })

                }
                return task
            })
            task_store.setAllTasks(allTasks_mutate);
            tovar_forTask_store.setTovarTask(tovar_task)
        }

        if (user_store.isWorker) {
            fomData = {
                role: "WORKER",
                tovar_task_id: tovar_task.id,
                new_status_for_tovar: statuses_tovar_for_task.tovar_successfully_removed_from_delivery_list.value
            }

            const result = await tovar_forTask_store.deleteTovar_fromTask(fomData);
        }

    }

    // открытие диалогового окна сообщения бота и запись в него 
    // соответствующее статусу товара сообщение
    const handleMouseEnter = () => {

        // Необходимо удалить этот товар из списка поставки
        if (tovar_task.status === statuses_tovar_for_task.must_be_deleted.value) {
            bot_messages_store.set_Open_Bot(true)
            bot_messages_store.set_Bot_Message(statuses_tovar_for_task.must_be_deleted.message)
        }

        // Этот товар добавлен для сборки в поставку
        if (tovar_task.status === statuses_tovar_for_task.this_tovar_added_for_delivery.value) {
            bot_messages_store.set_Open_Bot(true)
            bot_messages_store.set_Bot_Message(statuses_tovar_for_task.this_tovar_added_for_delivery.message)
        }
    }

    // закрытие диалогового окна бота
    const handleMouseLeave = () => {
        bot_messages_store.set_Open_Bot(false)
        // bot_messages_store.set_Bot_Message("")
    }


    const print_sticker = () => {
    }

    return (
        <div
            key={tovar_task.id}
            className={tovar_task.status === statuses_tovar_for_task.tovar_is_packed.value ?
                `${styles.tovar_task_container} ${styles.tovar_task_container_done}`
                : tovar_task.status === statuses_tovar_for_task.must_be_deleted.value ?
                    `${styles.tovar_task_container} ${styles.tovar_task_must_be_deleted}`
                    : tovar_task.status === statuses_tovar_for_task.tovar_packaging_is_suspended.value ?
                        `${styles.tovar_task_container} ${styles.tovar_packaging_is_suspended}`
                        : tovar_task.status === statuses_tovar_for_task.this_tovar_added_for_delivery.value ?
                            `${styles.tovar_task_container} ${styles.this_tovar_added_for_delivery}`
                            : styles.tovar_task_container

            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <div className={`${styles.item} ${styles.task_id_value} ${styles.clip_text}`}>
                <div className={styles.tovar_number_flexBox}>

                    <div className={styles.tovar_number}>
                        {index + 1}
                    </div>

                    {user_store.isAdmin && !statusAllowedToDelete ?
                        <Red_btn
                            style={{ width: "50px", height: "50px" }}
                            onClick={deleteTovar_fromTask}
                        >
                            <MdDeleteForever />
                        </Red_btn>
                        : user_store.isWorker && statusAllowedToDelete ?

                            <Red_btn
                                style={{ width: "50px", height: "50px" }}
                                onClick={deleteTovar_fromTask}
                            >
                                <MdDeleteForever />
                            </Red_btn>

                            :
                            <></>

                    }


                </div>
            </div>

            <div className={styles.line} ></div>

            <div className={`${styles.item} ${styles.itemFoto}`}>

                {current_URL && tovar_task.tovar_for_warehouse?.photo_for_tovars[0]?.img_name
                    ?
                    <img
                        className={styles.photo_for_tovars}
                        src={`${current_URL}${tovar_task.tovar_for_warehouse.photo_for_tovars[0].img_name}`}
                        alt="Фото товара"
                    />
                    :
                    <></>

                }
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


            {/* блок изменения количества товара  для сборки */}
            <Cartons_required_box
                className={
                    tovar_task.status === statuses_tovar_for_task.quantity_has_been_changed.value
                        ? `${styles.quantity_has_been_changed}`
                        :
                        null
                }
                tovar_task_status={tovar_task.status}
                key={tovar_task.id}
                task_id={tovar_task.taskId}
                tovar_task={tovar_task}
            ></Cartons_required_box>






            <div className={styles.line} ></div>


            <div className={styles.box_number}>
                <div
                    className={
                        tovar_task.status === statuses_tovar_for_task.tovar_is_packed.value
                            ? `${styles.BsFillBoxSeamFill} ${styles.green}`



                            : `${styles.BsFillBoxSeamFill} `
                    }

                    onClick={сhangeStatus_tovarTask_OPENpopup}
                >
                    {
                        tovar_task.quantityBoxes == "0"
                            ? <BsFillBoxSeamFill />
                            : tovar_task.status === statuses_tovar_for_task.must_be_deleted.value
                                ?
                                <div className={styles.wrapper_number}>
                                    <HiLockClosed />
                                    <div
                                        className={styles.number}
                                    >
                                        {tovar_task.quantityBoxes}
                                    </div>
                                </div>
                                :
                                <div className={styles.wrapper_number}>
                                    <BsFillBox2Fill />
                                    <div
                                        className={styles.number}
                                    >
                                        {tovar_task.quantityBoxes}
                                    </div>
                                </div>
                    }
                </div>

                <CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT
                    variable_for_check={tovar_task.status === statuses_tovar_for_task.must_be_deleted.value}
                >
                    <ChangeStatus_tovarTask
                        tovar_task_status={tovar_task.status}
                        tovar_task={tovar_task}
                        isOpen={isOpen_сhangeStatus_tovarTask_popup}
                        setIsOpen={setIsOpen_сhangeStatus_tovarTask_popup}
                    ></ChangeStatus_tovarTask>
                </CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT>





            </div>
        </div >
    )

}

export default observer(Tovar_task)