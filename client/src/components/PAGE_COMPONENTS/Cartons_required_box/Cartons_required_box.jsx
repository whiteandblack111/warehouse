import { observer } from "mobx-react-lite"
import styles from './cartons_required_box.module.css';
import Update_popup from "../../POPup/Update_popup";
import Open_close_btn from "../../UI/BUTTONS/Open_close_btn/Open_close_btn";
import { useEffect, useState } from "react";





const Cartons_required_box = (props) => {

    const [tovar_task, setTovar_task] = useState({})
    
    useEffect(() => {
        setTovar_task(props.tovar_task)
    }, [])



    const [isOpen_update_quantity_popup, setIsOpen_update_quantity_popu] = useState(false);
    const open_close_quantity_update_popup = () => {

        if (isOpen_update_quantity_popup) {
            setIsOpen_update_quantity_popu(false);
            return
        }
        setIsOpen_update_quantity_popu(true)

    }


    return (
        <div
            key={tovar_task.id}
            className={`${styles.item} ${styles.cartons_required_box} ${styles.clip_text}`}

        >
            <div className={styles.column}>
                <p>
                    требуется
                </p>
                <p
                    className={
                        tovar_task.status === 'changed'
                            ? `${styles.cartons_required}  ${styles.clip_text} ${styles.cartons_required_changed}`
                            : `${styles.cartons_required}  ${styles.clip_text}`

                    }
                >
                    {tovar_task.cartons_required}
                </p>
            </div>

            <div className={styles.line_mini} ></div>
            <div className={styles.column}>
                <p>
                    имеется
                </p>
                <p
                className={styles.cartons_found}
                >
                    {tovar_task.cartons_found}
                </p>
            </div>
            <Update_popup
                task_id={props.task_id}
                tovar_task={tovar_task}
                isOpenPopup={isOpen_update_quantity_popup}
                callback_active_func={open_close_quantity_update_popup}
            ></Update_popup>

            <Open_close_btn
                key={tovar_task.id}
                callback_active_func={open_close_quantity_update_popup}
            ></Open_close_btn>

        </div>
    )
}


export default observer(Cartons_required_box);
