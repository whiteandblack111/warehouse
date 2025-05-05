import { observer } from "mobx-react-lite"
import styles from './cartons_required_box.module.css';
import Update_quantityTovarTask_popup from "../../POPUPs/Update_quantityTovar/Update_quantityTovar_popup";
import Open_close_btn from "../../UI/BUTTONS/Open_close_btn/Open_close_btn";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../../index";





const Cartons_required_box = (props) => {

    const { user_store } = useContext(Context)


    const [isOpen_update_quantity_popup, setIsOpen_update_quantity_popup] = useState(false);
    const open_close_quantity_update_popup = () => {

        if (isOpen_update_quantity_popup) {
            setIsOpen_update_quantity_popup(false);
            return
        }
        setIsOpen_update_quantity_popup(true)

    }

    // setTovar_for_warehouse(tovar_task.warehouse_tovar_quantity.tovar_for_warehouse)
    // console.log("tovar_warehouse_quantity=======> ", tovar_warehouse_quantity)

    return (
        <div
            key={props.tovar_task.id}
            className={`${styles.item} 
            ${styles.cartons_required_box} 
            ${styles.clip_text}`}

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
                <p
                    className={
                        props.tovar_task.status === 'changed'
                            ? `${styles.cartons_required}  ${styles.clip_text} ${styles.cartons_required_changed}`
                            : `${styles.cartons_required}  ${styles.clip_text}`

                    }
                >
                    {props.tovar_task.cartons_required}
                </p>
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
                    <Update_quantityTovarTask_popup
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

                </>
                :
                <></>

            }


        </div>
    )
}


export default observer(Cartons_required_box);
