import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite"
import styles from './update_quantityTovar_popup.module.css'
import Plus_btn from "../../UI/BUTTONS/Plus_btn/Plus_btn"
import Minus_btn from "../../UI/BUTTONS/Minus_btn/Minus_btn"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Fiolet_border_btn from '../../UI/BUTTONS/Fiolet_border_btn/Fiolet_border_btn';
import { Context } from '../../..';







const Update_quantityTovar_popup = (props) => {

    const [quantity, setQuantity] = useState(0);
    const { tovar_forTask_store } = useContext(Context)
    const { task_store } = useContext(Context);
    const { tovar_store } = useContext(Context);


    useEffect(() => {
        {
            props.warehouse_or_task === "warehouse"
            ?
            setQuantity(props.tovar.quantity)
            : props.warehouse_or_task === "task" ?
                setQuantity(props.tovar_task.cartons_required)
                :
                setQuantity("warehouse_or_task ?");
        }

    }, [tovar_forTask_store.tovarTask])


    const handler_input = (e) => {
        if (e.key === "Enter") {
            // input__ref.current.focus();
        }
    }

    const plus_quantity = () => {
        setQuantity(Number(quantity) + 1)
    }
    const minus_quantity = () => {
        if (Number(quantity) > 0) {
            setQuantity(Number(quantity) - 1)
        }

    }

    const close_popup = (e) => {
        props.callback_active_func(false)
    }

    const update_quantity_tovar = async () => {
        if (props.warehouse_or_task === "task") {
            const formData = {
                task_id: props.task_id,
                tovar_task_id: props.tovar_task.id,
                quantity: quantity
            }
            
            const updatedTovar = await tovar_forTask_store.update_tovar_forTask(formData)


            const allTasks_mutate = task_store.allTasks.map((task) => {

                if (task.id === updatedTovar.taskId) {
                    task.tovar_for_tasks.map((tovar_item) => {
                        if (tovar_item.id === updatedTovar.id) {
                            tovar_item.cartons_required = updatedTovar.cartons_required
                        }
                        return tovar_item
                    })
                }
                return task
            })

            task_store.setAllTasks(allTasks_mutate);
            tovar_forTask_store.setTovarTask(updatedTovar)
            


            // let allTovars_mutate = this.allTovars.map((tovar_item) => {

            //     if(tovar.id === tovar_item.id){
            //         tovar_item.cartons_required = tovar.cartons_required
            //     }
            //     return tovar_item
            // })
            // console.log("allTovars_mutate ====>", allTovars_mutate)

        }

        if (props.warehouse_or_task === "warehouse") {
            const formData = {
                id: props.tovar.id,
                quantity: quantity
            }

            await tovar_store.update_tovar_warehouse(formData)
            console.log(formData)
        }

    }


    return (
        <div
            className={props.isOpenPopup ? styles.update_popup : styles.update_popup_close}
            onMouseLeave={(e) => { close_popup() }}
        >
            <Form >
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Изменить количество</Form.Label>
                    <Form.Control

                        className={`${styles.input} ${styles.input_update}`}
                        key="manufacturer_ID"
                        type="text"
                        placeholder={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        onKeyUp={handler_input}
                        value={quantity}
                    />
                </Form.Group>
            </Form>

            <div className={styles.btn_box_row}>
                <Minus_btn minus_quantity={minus_quantity}></Minus_btn>
                <Plus_btn plus_quantity={plus_quantity} ></Plus_btn>
            </div>

            <Fiolet_border_btn
                btn_click_callbackFunction={update_quantity_tovar}
            >отправить</Fiolet_border_btn>




        </div>
    )
}

export default observer(Update_quantityTovar_popup)