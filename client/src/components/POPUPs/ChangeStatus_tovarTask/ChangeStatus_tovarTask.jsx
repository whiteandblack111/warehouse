import { observer } from "mobx-react-lite"

import styles from './сhangeStatus_tovarTask.module.css'
import Green_status_btn from "../../UI/BUTTONS/Green_status_btn/Green_status_btn"
import Yellow_status_btn from "../../UI/BUTTONS/Yellow_status_btn/Yellow_status_btn"
import Red_status_btn from "../../UI/BUTTONS/Red_status_btn/Red_status_btn"
import { useContext, useRef, useState } from "react"
import { Context } from "../../.."

import Form from 'react-bootstrap/Form';
import Fiolet_border_btn from "../../UI/BUTTONS/Fiolet_border_btn/Fiolet_border_btn"
import { MdDoneOutline } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Close_btn from "../../UI/BUTTONS/Close_btn/Close_btn"




const ChangeStatus_tovarTask = (props) => {
    const [tovarStatus, setTovarStatus] = useState("default");
    const [isOpen_green_blockBtns, setIsOpen_green_blockBtns] = useState(false);
    const [isOpen_red_blockBtns, setIsOpen_red_blockBtns] = useState(false);


    const [quantityBoxes, setQuantityBoxes] = useState(1);
    const [stopReason, setStopReason] = useState(null);

    const { tovar_store } = useContext(Context);
    const { tovar_forTask_store } = useContext(Context);


    const update_quantityBoxes_tovarTask = async () => {
        let formData = {
            tovar_task_id: props.tovar_task.id,
            quantityBoxes: quantityBoxes
        }
        await tovar_forTask_store.update_tovar_forTask(formData)
    }

    const set_stopStatus_tovarTask = async () => {
        let formData = {
            tovar_task_id: props.tovar_task.id,
            stopReason: stopReason
        }
        await tovar_forTask_store.update_tovar_forTask(formData)
    }



    return (
        <div className={
            !props.isOpen
                ?
                styles.сhangeStatus_tovarTask_popup
                :
                `${styles.сhangeStatus_tovarTask_popup} ${styles.open}`
        }

        >

            <div className={styles.row_box_btns}

            >
                <Green_status_btn
                    btn_function={() => { setIsOpen_green_blockBtns(true) }}
                >
                    <MdDoneOutline />
                </Green_status_btn>

                <Red_status_btn
                    btn_function={() => { setIsOpen_red_blockBtns(true) }}
                >
                    <AiOutlineStop />
                </Red_status_btn>

                <Close_btn
                    callback_func={() => { props.setIsOpen(false) }}
                ></Close_btn>
            </div>

            <div className={isOpen_green_blockBtns
                ?
                `${styles.popup_blockBtns} ${styles.isOpen_blockBtns}`
                :
                `${styles.popup_blockBtns} ${styles.isClose_blockBtns}`
            }
            >

                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`}>
                    <Form.Label
                        className={styles.inputLabel}
                    >Кол-во коробов:</Form.Label>

                    <Form.Control
                        className={`${styles.input} ${styles.input_quantity}`}
                        key="red_reason"
                        type="text"
                        placeholder="число"
                        onChange={e => setQuantityBoxes(e.target.value)}
                        value={quantityBoxes}
                    />
                </Form.Group>

                <Fiolet_border_btn
                    btn_click_callbackFunction={update_quantityBoxes_tovarTask}
                >Указать</Fiolet_border_btn>

                <Close_btn
                    callback_func={() => { setIsOpen_green_blockBtns(false) }}
                ></Close_btn>

            </div>

            <div className={isOpen_red_blockBtns
                ?
                `${styles.popup_blockBtns} ${styles.isOpen_blockBtns}`
                :
                `${styles.popup_blockBtns} ${styles.isClose_blockBtns}`
            }
            >

                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`}>
                    <Form.Label
                        className={styles.inputLabel}
                    >Укажите:</Form.Label>
                    <Form.Control
                        className={`${styles.input} ${styles.input_quantity}`}
                        key="stop_reason"
                        type="text"
                        placeholder="Причина"
                        onChange={e => setStopReason(e.target.value)}
                        value={stopReason}
                    />
                </Form.Group>

                <Fiolet_border_btn
                    btn_click_callbackFunction={set_stopStatus_tovarTask}
                >Отправить</Fiolet_border_btn>

                <Close_btn
                    callback_func={() => { setIsOpen_red_blockBtns(false) }}
                ></Close_btn>
            </div>

        </div>
    )

}

export default observer(ChangeStatus_tovarTask)