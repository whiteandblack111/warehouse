import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite"
import styles from './update_quantityTovar_popup.module.css'
import Plus_btn from "../../UI/BUTTONS/Plus_btn/Plus_btn"
import Minus_btn from "../../UI/BUTTONS/Minus_btn/Minus_btn"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Fiolet_border_btn from '../../UI/BUTTONS/Fiolet_border_btn/Fiolet_border_btn';
import { Context } from '../../..';
import { statuses_tovar_for_task } from "../../../utils/entity_statuses";
import { checkInput_for_allowNumbers } from '../../../utils/helpers';






const Update_quantityTovar_popup = (props) => {

    const [quantity, setQuantity] = useState(0);
    const { tovar_forTask_store } = useContext(Context)
    const { task_store } = useContext(Context);
    const { tovar_store } = useContext(Context);


    useEffect(() => {
        setQuantity(props.tovar.quantity)

    }, [tovar_forTask_store.tovarTask])



    const handler_input = (e) => {
        if (e.key === "Enter") {
            // input__ref.current.focus();
        }
    }

    const plus_quantity = () => {
        console.log(props.tovar_task)
        setQuantity(Number(quantity) + 1)
    }
    const minus_quantity = () => {
        if (Number(quantity) > 0) {
            setQuantity(Number(quantity) - 1)
        }

    }

    const close_popup = () => {

        console.log("dassadasdasddas")

        props.callback_active_func(false)
    }

    const update_quantity_tovar = async () => {

        const formData = {
            id: props.tovar.id,
            quantity: quantity
        }

        await tovar_store.update_tovar_warehouse(formData)
        console.log(formData)

    }

    const hendlerInputQuantity = (e) => {

        checkInput_for_allowNumbers(e)

        setQuantity(e.target.value)
    }


    return (
        <div
            className={props.isOpenPopup ? styles.update_popup : styles.update_popup_close}
            onMouseLeave={(e) => { close_popup() }}
        >

            <Form className={styles.Form} >
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Изменить количество</Form.Label>
                    <Form.Control

                        className={`${styles.input} ${styles.input_update}`}
                        key="manufacturer_ID"
                        type="text"
                        placeholder={quantity}
                        onChange={e => hendlerInputQuantity(e)}
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
                className={styles.Fiolet_border_btn_Update_quantity}
                className_text={styles.Fiolet_border_btnText}
                btn_click_callbackFunction={update_quantity_tovar}
            >отправить</Fiolet_border_btn>




        </div>
    )
}

export default observer(Update_quantityTovar_popup)