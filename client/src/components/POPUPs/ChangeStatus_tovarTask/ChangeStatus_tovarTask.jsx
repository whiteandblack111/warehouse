import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect, useRef } from 'react';

// import styles from './сhangeStatus_tovarTask.module.css'
import styles_desctop from './сhangeStatus_tovarTask.module.css';
import styles_mobile from './сhangeStatus_tovarTask.module.css';
import Green_status_btn from "../../UI/BUTTONS/Green_status_btn/Green_status_btn"
import Red_status_btn from "../../UI/BUTTONS/Red_btn/Red_btn"
import { Context } from "../../.."

import Form from 'react-bootstrap/Form';
import Fiolet_border_btn from "../../UI/BUTTONS/Fiolet_border_btn/Fiolet_border_btn"
import { AiOutlineStop } from "react-icons/ai";
import Close_btn from "../../UI/BUTTONS/Close_btn/Close_btn"
import { ImBoxAdd } from "react-icons/im";
import NeonGlass_dropdown from "../../UI/Dropdown/NeonGlass_dropdown";
import Light_neon_input from "../../UI/INPUTS/Light_neon_input/Light_neon_input";





const ChangeStatus_tovarTask = (props) => {
    const [styles, setStyles] = useState('');
    const [isOpen_green_blockBtns, setIsOpen_green_blockBtns] = useState(false);
    const [isOpen_red_blockBtns, setIsOpen_red_blockBtns] = useState(false);

    const [all_task_boxes, setAll_task_boxes] = useState([]);

    const [boxNumber, setboxNumber] = useState("new");
    const [quantityTovar_forBox, setQuantityTovar_forBox] = useState(0);

    const [stopReason, setStopReason] = useState("");

    const { tovar_forTask_store } = useContext(Context);
    const { interface_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { boxTask_store } = useContext(Context);




    useEffect(() => {
        setStyles(styles_desctop)

        if (interface_store.isMobile) {
            setStyles(styles_mobile)
        }

    }, [interface_store.isMobile])


    const handleSelect_boxNumber = (evt) => {
        setboxNumber(evt)

        console.log(boxNumber)
    }

    const handleSelect_quantityTovar = (value) => {
        if (props.tovar_task.changed_cartons_required === 0) {
            if (value > props.tovar_task.cartons_required) {
                setQuantityTovar_forBox(props.tovar_task.cartons_required)
            } else {
                setQuantityTovar_forBox(value)
            }
            return
        }

        //Если УВЕЛИЧИЛИ изменяющее количество больше изначального
        // 10 <> 20
        if (props.tovar_task.changed_cartons_required > props.tovar_task.cartons_required) {
            // Количество будет равно изменяющему количество цифре
            let max_quantity = props.tovar_task.changed_cartons_required
            if (value > max_quantity) {
                setQuantityTovar_forBox(max_quantity)
            } else {
                setQuantityTovar_forBox(value)
            }

            return
        }

        //Если УМЕНЬШИЛИ изменяющее количество МЕНЬШЕ изначального
        // 10 <> 7
        if (props.tovar_task.changed_cartons_required < props.tovar_task.cartons_required) {
            let max_quantity = props.tovar_task.changed_cartons_required
            if (value > max_quantity) {
                setQuantityTovar_forBox(max_quantity)
            } else {
                setQuantityTovar_forBox(value)
            }
            return
        }


        console.log(quantityTovar_forBox)
    }



    const update_quantityBoxes_tovarTask = async () => {
        let formData = {
            boxNumber: boxNumber,
            taskId: props.tovar_task.id,
            tovarForWarehouseId: props.tovar_task.tovarForWarehouseId,
            quantityTovar: quantityTovar_forBox
        }

        // console.log("props=========> ", props)
        // console.log("boxNumber-new=========> ", boxNumber === "new")

        if (boxNumber === "new") {
            formData.boxNumber = all_task_boxes.length + 1
        }


        console.log("formData=========> ", formData)

        const boxTask = await boxTask_store.addTovar_boxTask(formData);

        console.log("boxTask=========> ", boxTask)

        // const tovar_task = await tovar_forTask_store.update_tovar_forTask(formData)


        // let allTask_new = [...task_store.allTasks]

        // let allTask_mutate = allTask_new.map((task) => {
        //     if (task.id === tovar_task.taskId) {

        //         let new_Tovar_for_tasks = task.tovar_for_tasks.map((task_tovar) => {

        //             if (task_tovar.id === tovar_task.id) {
        //                 return tovar_task
        //             }

        //             if (task_tovar.id !== tovar_task.id) {
        //                 return task_tovar
        //             }
        //         })
        //         task.tovar_for_tasks = new_Tovar_for_tasks

        //         return task
        //         // task.tovar_for_tasks.map(task_tovar => task_tovar.id === tovar_task.id ? tovar_task : task_tovar)
        //     }
        //     return task
        // })

        // console.log("allTask_mutate========= ", allTask_mutate)


        // task_store.setIsLoading(true)
        // task_store.setAllTasks(allTask_mutate)
        // task_store.setIsLoading(false)
    }

    const set_stopStatus_tovarTask = async () => {

        let formData = {
            tovar_task_id: props.tovar_task.id,
            tovarForWarehouseId: props.tovar_task.tovarForWarehouseId,
            quantityTovar: props.tovar_task.cartons_required,
            stopReason: stopReason,

        }
        const tovar_task = await tovar_forTask_store.update_tovar_forTask(formData);

        let allTask_new = [...task_store.allTasks]

        let allTask_mutate = allTask_new.map((task) => {
            if (task.id === tovar_task.taskId) {

                let new_Tovar_for_tasks = task.tovar_for_tasks.map((task_tovar) => {

                    if (task_tovar.id === tovar_task.id) {
                        return tovar_task
                    }

                    if (task_tovar.id !== tovar_task.id) {
                        return task_tovar
                    }
                })
                task.tovar_for_tasks = new_Tovar_for_tasks

                return task
                // task.tovar_for_tasks.map(task_tovar => task_tovar.id === tovar_task.id ? tovar_task : task_tovar)
            }
            return task
        })

        task_store.setIsLoading(true)
        task_store.setAllTasks(allTask_mutate)
        task_store.setIsLoading(false)

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
                    {/* <MdDoneOutline /> */}
                    <ImBoxAdd />
                </Green_status_btn>

                <Red_status_btn
                    btn_function={() => { setIsOpen_red_blockBtns(true) }}
                >
                    <AiOutlineStop />
                </Red_status_btn>

                <Close_btn
                    onClick={() => { props.setIsOpen(false) }}
                ></Close_btn>
            </div>

            <div className={isOpen_green_blockBtns
                ?
                `${styles.popup_blockBtns} ${styles.isOpen_blockBtns}`
                :
                `${styles.popup_blockBtns} ${styles.isClose_blockBtns}`
            }
            >


                <NeonGlass_dropdown
                    title="Выберите короб"
                    selectsData={all_task_boxes}
                    selectId="id"
                    selectName="boxNumber"
                    onSelect={(eventKey) => handleSelect_boxNumber(eventKey)}

                />

                <Light_neon_input
                    forTypeValue="number"
                    placeholder="количество:"
                    className="width_55_proc"
                    className_placeholder='placeholder_text_center'
                    type="text"
                    forKey="quantityTovar_for_box"
                    onChange={handleSelect_quantityTovar}
                    value={quantityTovar_forBox}


                ></Light_neon_input>

                <Fiolet_border_btn
                    className="Fiolet_border_btn"
                    btn_click_callbackFunction={update_quantityBoxes_tovarTask}
                >Указать</Fiolet_border_btn>

                <Close_btn
                    onClick={() => { setIsOpen_green_blockBtns(false) }}
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
                    onClick={() => { setIsOpen_red_blockBtns(false) }}
                ></Close_btn>
            </div>

        </div>
    )

}

export default observer(ChangeStatus_tovarTask)