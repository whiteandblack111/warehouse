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
import { statuses_tovar_for_task } from "../../../utils/entity_statuses";





const ChangeStatus_tovarTask = (props) => {
    const [styles, setStyles] = useState('');
    const [isOpen_green_blockBtns, setIsOpen_green_blockBtns] = useState(false);
    const [isOpen_red_blockBtns, setIsOpen_red_blockBtns] = useState(false);


    const [numberBox_inTask, setNumberBox_inTask] = useState("new");

    const [quantityTovar_forBox, setQuantityTovar_forBox] = useState(0);
    const [stopReason, setStopReason] = useState("");

    const [boxes_for_task, setBoxes_for_task] = useState([])


    const { tovar_forTask_store } = useContext(Context);
    const { interface_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { boxTask_store } = useContext(Context);



    useEffect(() => {
        getAllBoxes_for_currentTask()
    }, [])


    useEffect(() => {
        getAllBoxes_for_currentTask()
        boxTask_store.setIsChahge(false)
    }, [boxTask_store.isChahge])



    useEffect(() => {
        setStyles(styles_desctop)

        if (interface_store.isMobile) {
            setStyles(styles_mobile)
        }

    }, [interface_store.isMobile])

    const getAllBoxes_for_currentTask = async () => {
        // ЧИСТО ДЛЯ ТЕСТОВ
        const boxes = await boxTask_store.getAllBoxes_for_currentTask(props.tovar_task.taskId);

        setBoxes_for_task(boxes)

        // console.log("ChangeStatus_tovarTask boxes_for_task ===> ", boxTask_store.boxes_for_task)

    }

    const handleSelect_boxNumber = (evt) => {

        setNumberBox_inTask(evt)

        console.log(numberBox_inTask)
    }

    const handleSelect_quantityTovar = (value) => {
        // console.log("handleSelect_quantityTovar-=-=-=> ", value)
        // console.log("handleSelect_quantityTovar-=-=-=> ", typeof value)

        //Если количество не изменяли
        if (props.tovar_task.changed_cartons_required === 0) {
            let max_quantity = props.tovar_task.cartons_required - props.tovar_task.cartons_found
            if (value > props.tovar_task.cartons_required) {
                setQuantityTovar_forBox(max_quantity)
            } else {
                setQuantityTovar_forBox(value)
            }
            return
        }

        //Если УВЕЛИЧИЛИ изменяющее количество больше изначального
        // 10 <> 20
        if (props.tovar_task.changed_cartons_required > props.tovar_task.cartons_required) {
            // Количество будет равно изменяющему количество цифре (минус) упакованное количество
            let max_quantity = props.tovar_task.changed_cartons_required - props.tovar_task.cartons_found
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

            let max_quantity = props.tovar_task.changed_cartons_required - props.tovar_task.cartons_found
            if (value > max_quantity) {
                setQuantityTovar_forBox(Number(max_quantity))
            } else {
                setQuantityTovar_forBox(Number(value))
            }
            return
        }


        console.log(quantityTovar_forBox)
    }



    const update_quantityBoxes_tovarTask = async () => {
        let formData = {
            boxTaskId: 0,
            numberBox_inTask: 0,
            taskId: props.tovar_task.taskId,
            quantityTovar: Number(quantityTovar_forBox),
            tovarForTaskId: props.tovar_task.id,
            status: statuses_tovar_for_task.the_tovar_in_process_of_packaging.value
            
        }

        // если сумма упаковываемого товара равна 
        // требуемому учитывая изменяемое количество
        const setCartons_max = async () => {
            let result
            if (props.tovar_task.changed_cartons_required <= props.tovar_task.cartons_required 
                && 
                props.tovar_task.changed_cartons_required !== 0) {

                result = props.tovar_task.changed_cartons_required
                console.log("cartons_max===> 1 ", result)
            }

            if (props.tovar_task.changed_cartons_required >= props.tovar_task.cartons_required) {
                result = props.tovar_task.changed_cartons_required
                console.log("cartons_max===> 2 ", result)
            }

            if (props.tovar_task.changed_cartons_required === 0) {
                result = props.tovar_task.cartons_required
                console.log("cartons_max===> 3 ", result)
            }

            return result
        }
        let cartons_max = await setCartons_max()

        if (props.tovar_task.cartons_found + quantityTovar_forBox === cartons_max) {
            // устанавливаем статус готовности

            formData.status = statuses_tovar_for_task.tovar_is_packed.value
        }

        if (numberBox_inTask === "new") {
            formData.numberBox_inTask = boxes_for_task.length + 1
            formData.boxTaskId = boxes_for_task.length + 1
        }

        if (numberBox_inTask !== "new") {
            formData.numberBox_inTask = Number(numberBox_inTask)

            console.log(numberBox_inTask !== "new")
            boxes_for_task.map((box, index) => {
                if (Number(numberBox_inTask) === box.numberBox_inTask) {

                    formData.boxTaskId = box.id
                }
            })
        }


        console.log("formData=========>1 ", formData)
        if (quantityTovar_forBox !== 0) {
            // boxTask_store.setIsChahge(true)
            const boxTask = await boxTask_store.addTovar_boxTask(formData);
            // boxTask_store.setIsChahge(false)
            console.log("boxTask=========>2 ", boxTask)
        }

        










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


            {/* форма для - для положить товар в  коробку */}

            <div className={isOpen_green_blockBtns
                ?
                `${styles.popup_blockBtns} ${styles.isOpen_blockBtns}`
                :
                `${styles.popup_blockBtns} ${styles.isClose_blockBtns}`
            }
            >
                <NeonGlass_dropdown
                    title="Выберите короб"
                    selectsData={boxes_for_task}
                    selectId="numberBox_inTask"
                    selectName="numberBox_inTask"
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