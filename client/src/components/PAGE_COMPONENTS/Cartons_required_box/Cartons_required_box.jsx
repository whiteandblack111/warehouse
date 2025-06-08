import { observer } from "mobx-react-lite"
import styles from './cartons_required_box.module.css';
import Update_quantityTovarTask_popup from "../../POPUPs/Update_quantityTovar_forTask/Update_quantityTovar_forTask_popup";
import Open_close_btn from "../../UI/BUTTONS/Open_close_btn/Open_close_btn";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../index";
import { statuses_tovar_for_task } from "./../../../utils/entity_statuses";
import CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT from '../CHECKIHG_ACCESS/CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT'





const Cartons_required_box = (props) => {
    // console.log(`Cartons_required_box props.tovar_task(${props.tovar_task.id})-=-=-=-=-=->`, props.tovar_task)

    const { user_store } = useContext(Context)
    const { bot_messages_store } = useContext(Context)

    //все статусы относящиеся к данному товару
    const [tovarTask_statuses, setTovarTask_statuses] = useState([])

    //статусы товара по отдельности
    const [status_quantity_changed, setStatus_quantity_changed] = useState(() => { return false });
    const [status_must_be_deleted, setStatus_must_be_deleted] = useState(() => { return false });
    const [status_tovar_is_packed, setStatus_tovar_is_packed] = useState(() => { return false });

    const [data_modified_quantity, setData_modified_quantity] = useState({
        past_value: 0,
        difference: 0,
        total_number: 0,
        statusText: "",
    })



    useEffect(() => {


        setTovarTask_statuses(() => { return props.tovar_task.tovarTask_statuses })

        setData_modified_quantity(() => {

            const result = {
                past_value: 0,
                difference: 0,
                total_number: 0,
                statusText: "",
            }

            if (props.tovar_task.changed_cartons_required > props.tovar_task.cartons_required) {
                result.past_value = props.tovar_task.cartons_required;
                result.difference = props.tovar_task.changed_cartons_required - props.tovar_task.cartons_required;
                result.total_number = props.tovar_task.changed_cartons_required
                result.statusText = "УВЕЛИЧИТЬ"
                return result
            }

            if (props.tovar_task.changed_cartons_required <= props.tovar_task.cartons_required) {
                result.past_value = props.tovar_task.cartons_required;
                result.difference = props.tovar_task.cartons_required - props.tovar_task.changed_cartons_required;
                result.total_number = props.tovar_task.changed_cartons_required
                result.statusText = "УМЕНЬШИТЬ"
                return result
            }

            if (props.tovar_task.changed_cartons_required === 0) {
                result.total_number = props.tovar_task.cartons_required
                return result
            }

        })
        checking_tovarForTask_statuses(tovarTask_statuses)

        // console.log("Cartons_required_box data_modified_quantity-=-=-=-=-=->", data_modified_quantity)

    }, []);


    const checking_tovarForTask_statuses = (statuses) => {

        statuses.map((tovar_status) => {
            if (tovar_status.value === statuses_tovar_for_task.must_be_deleted.value) {
                setStatus_must_be_deleted(true)
            }
        })

        statuses.map((tovar_status) => {
            if (tovar_status.value === statuses_tovar_for_task.quantity_has_been_changed.value) {
                setStatus_quantity_changed(true)
            }
        })

        statuses.map((tovar_status) => {
            if (tovar_status.value === statuses_tovar_for_task.tovar_is_packed.value) {
                setStatus_tovar_is_packed(true)
            }
        })

    }

    // открытие диалогового окна сообщения бота и запись в него 
    // соответствующее статусу товара сообщение
    const handleMouseEnter = () => {
        // Количество товара для сборки было изменено
        if (status_quantity_changed) {
            const data_message = data_modified_quantity
            const bot_message = `
            ${statuses_tovar_for_task.quantity_has_been_changed.message}, требуется
            ${data_message.statusText} на ${data_message.difference}, начальное количество 
            ${data_message.past_value}, но уже требуется 
            ${data_message.total_number} !`


            bot_messages_store.set_Open_Bot(true)
            bot_messages_store.set_Bot_Message(bot_message)
        }

    }

    // закрытие диалогового окна бота
    const handleMouseLeave = () => {
        bot_messages_store.set_Open_Bot(false)
        // bot_messages_store.set_Bot_Message("")
    }

    const [isOpen_update_quantity_popup, setIsOpen_update_quantity_popup] = useState(false);
    const open_close_quantity_update_popup = () => {

        if (!status_must_be_deleted) {
            if (isOpen_update_quantity_popup) {
                setIsOpen_update_quantity_popup(false);
                return
            }
            setIsOpen_update_quantity_popup(true)
        }


    }

    // setTovar_for_warehouse(tovar_task.warehouse_tovar_quantity.tovar_for_warehouse)
    // console.log("tovar_warehouse_quantity=======> ", tovar_warehouse_quantity)


    return (
        <div
            key={props.tovar_task.id}
            className={`${styles.item}
            ${styles.cartons_required_box} 
            ${styles.clip_text}
            ${props.className}`}


            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.column}>
                <p>
                    {
                        props.tovar_task.status === 'done'
                            ?
                            "В заказе"
                            :
                            "Требуется"
                    }

                </p>
                <div
                    className={
                        status_quantity_changed
                            ? `${styles.cartons_required}  ${styles.clip_text}`
                            : `${styles.cartons_required}  ${styles.clip_text}`

                    }
                >

                    <div>
                        {
                            props.tovar_task.changed_cartons_required !== 0 && data_modified_quantity.statusText === "УМЕНЬШИТЬ" ?
                                <>
                                    <span>{props.tovar_task.cartons_required}</span>
                                    <span className={`${styles.cartons_required_changed}`}>
                                        {` - ${data_modified_quantity.difference}`}
                                    </span>
                                </>
                                : props.tovar_task.changed_cartons_required !== 0 && data_modified_quantity.statusText === "УВЕЛИЧИТЬ" ?

                                    <>
                                        <span>{props.tovar_task.cartons_required}</span>
                                        <span className={`${styles.cartons_required_changed}`}>
                                            {` + ${data_modified_quantity.difference}`}
                                        </span>
                                    </>
                                    :
                                    <span>{props.tovar_task.cartons_required}</span>
                        }
                    </div>

                </div>
                <div className={styles.required_vs_found}>
                    {props.tovar_task.changed_cartons_required !== 0
                        ?
                        <p className={styles.required_number}>{data_modified_quantity.total_number}</p>
                        :
                        <p className={styles.required_number}>{props.tovar_task.cartons_required}</p>
                    }

                    /
                    <p className={styles.found_number}>{props.tovar_task.cartons_found}</p>

                </div>
            </div>

            <div className={styles.line_mini} ></div>
            <div className={styles.column}>
                <p>
                    Имеется
                </p>
                <p
                    className={styles.cartons_found}
                >
                    {props.tovar_task?.tovar_for_warehouse?.quantity}
                </p>
            </div>
            {user_store.isAdmin
                ?
                <>

                    <CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT
                        variable_for_check={status_must_be_deleted}
                    >
                        <Update_quantityTovarTask_popup

                            setAllTovars_task={props.setAllTovars_task}
                            allTovars_task={props.allTovars_task}
                            warehouse_or_task="task"
                            task_id={props.task_id}
                            tovar_task={props.tovar_task}
                            isOpenPopup={isOpen_update_quantity_popup}
                            callback_active_func={open_close_quantity_update_popup}
                        ></Update_quantityTovarTask_popup>


                        <Open_close_btn
                            key={props.tovar_task.id}
                            onClick={open_close_quantity_update_popup}
                        ></Open_close_btn>
                    </CHECKIHG_ACCESS_FOR_FUNCTIONALITY_COMPONENT>

                </>
                :
                <></>

            }


        </div>
    )
}


export default observer(Cartons_required_box);
