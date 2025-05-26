import React, { useContext, useState, useEffect, useRef } from 'react';

import styles from './addTovarInBox_form.module.css'
import *  as  XLSX from "xlsx";
import { Context } from '../../../index';

import Form from 'react-bootstrap/Form';
import { observer } from 'mobx-react-lite';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Light_neon_input from '../../UI/INPUTS/Light_neon_input/Light_neon_input';
import Popup_fon from '../../PAGE_COMPONENTS/Popup_fon/Popup_fon';
import Neon_wrapper from '../../UI/EFFECTS/Neon_wrapper/Neon_wrapper';
import Close_btn from '../../UI/BUTTONS/Close_btn/Close_btn';
import Glaassmorphism_btn from '../../UI/BUTTONS/Glaassmorphism_btn/Glaassmorphism_btn';



const CreateTask_form = () => {
    const { user_store } = useContext(Context);
    // console.log("user_store>>>> ", user_store.user);

    const [task_name, setTask_name] = useState('');
    const [tovars_for_task, setTovars_from_task] = useState([]);
    const [shop_name, setShop_name] = useState('Магазин получатель');

    useEffect(() => {
        window.addEventListener("keydown", handler_keyUp_form);
        return () => {
            window.removeEventListener("keydown", handler_keyUp_form);
        };
    }, []);

    useEffect(() => {
    }, [tovars_for_task])

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        let mutateTovar = jsonData.map((tovar) => {
            let newTovar = {
                warehouse_ID: tovar["артикул"],
                barcode: tovar["штрихкод"],
                name: tovar["имя (необязательно)"],
                cartons_required: tovar["количество"],
            }
            return newTovar
        })
        setTovars_from_task(mutateTovar)
    }

    const handleSelect = (evt) => {
        setShop_name(evt)
        console.log(evt)
    }


    const { task_store } = useContext(Context);

    const create_task = async () => {
        const creator_id = user_store.user.id;
        let mutateTovar = tovars_for_task.map((tovar) => {
            let newTovar = {
                ...tovar,
                shop_name: shop_name
            }
            return newTovar
        })


        setTovars_from_task(mutateTovar)
        const dataTask = {
            userId: user_store.user.id,
            task_name,
            shop_name,
            tovars_for_task: mutateTovar
        }
        console.log("dataTask====>", dataTask);

        await task_store.create_task(dataTask)
    }

    const handler_keyUp_form = (e) => {
        if (e.keyCode === 27) {
            console.log('Close')
            task_store.setIsCreate(false)
        }
    }

    const close_createTask_form = () => {
        task_store.setIsCreate(false)
    }

    return (
        <Popup_fon>
            <Neon_wrapper className={styles.Neon_wrapper}>
                <Form className={styles.container}>

                    <Close_btn
                        onClick={close_createTask_form}
                    ></Close_btn>

                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                        <Form.Label
                            className={styles.inputLabel}
                        >Добавление товара в короб</Form.Label>

                        <Light_neon_input
                            placeholder="Введите название поставки"
                            name="task_name"
                            key="task_name"
                            type='text'
                            onChange={setTask_name}
                            value={task_name}
                        ></Light_neon_input>
                    </Form.Group>


                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} >
                        <DropdownButton

                            onSelect={(eventKey) => handleSelect(eventKey)}

                            className="btn_glass"
                            id="dropdown-basic-button"
                            title={shop_name}
                        >
                            <Dropdown.Item eventKey="PUGGY">PUGGY</Dropdown.Item>
                            <Dropdown.Item eventKey="TODDY TOY">TODDY TOY</Dropdown.Item>
                            <Dropdown.Item eventKey="WHOLLAJOY">WHOLLAJOY</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Glaassmorphism_btn
                            onClick={() => create_task()}
                        >Создать</Glaassmorphism_btn>
                    </Form.Group>
                </Form>
            </Neon_wrapper>
        </Popup_fon >

    );
}

export default observer(CreateTask_form);