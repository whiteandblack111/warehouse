import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite"
import styles from './update_popup.module.css'
import Plus_btn from "../UI/BUTTONS/Plus_btn/Plus_btn"
import Minus_btn from "../UI/BUTTONS/Black_btn/Minus_btn"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Update_btn from '../UI/BUTTONS/Update_btn/Update_btn';







const Update_popup = () => {
    const [quantity, setQuantity] = useState(0);

    const input_quantity_ref = useRef()
    const input_submit_ref = useRef()


    useEffect(()=>{
        setQuantity(0)
    }, [])

    const handler_input = (e) => {
        if (e.key === "Enter") {
            // input__ref.current.focus();
        }
    }

    const plus_quantity = () => {
        setQuantity(quantity + 1)
        console.log(quantity)
    }
    const minus_quantity = () => {
        if(quantity > 0){
            setQuantity(quantity - 1)
            console.log(quantity)
        }
       
    }



    return (
        <div className={styles.update_popup}>
            <Form className={styles.container}>
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Изменение количества</Form.Label>
                    <Form.Control
                        ref={input_quantity_ref}
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
                <Plus_btn plus_quantity={plus_quantity} ></Plus_btn>
                <Minus_btn minus_quantity={minus_quantity}></Minus_btn>
            </div>

            <Update_btn></Update_btn>




        </div>
    )
}

export default observer(Update_popup)