import React, { useContext, useState, useEffect, useRef  } from 'react';

import styles from './createTask_form.module.css'
import *  as  XLSX from "xlsx";
import { Context } from '../../../index';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const CreateTask_form = () => {

    const [task_name, setTask_name] = useState('');
    const [tovars_for_task, setTovars_from_task] = useState([]);

    const [shop_name, setShop_name] = useState('Магазин получатель');



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

    const handleSelect =  (evt) => {
        setShop_name(evt)
        console.log(evt)
    }


    const { task_store } = useContext(Context);
    const create_task = async () => {
        let mutateTovar = tovars_for_task.map((tovar) => {
            let newTovar = {
                ...tovar,
                shop_name:shop_name
            }
            return newTovar
        })

        setTovars_from_task(mutateTovar)
        const dataTask = {
            task_name,
            shop_name,
            tovars_for_task:mutateTovar       
        }
        console.log("dataTask====>", dataTask);
        await task_store.create_task(dataTask)
    }


    return (
            <Form className={styles.container}>
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Регистрация новой поставки в системе</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="task_name"
                        type='text'
                        placeholder="Введите название поставки"
                        onChange = {
                            (e)=> setTask_name(e.target.value)
                        }
                        value={task_name}
                    />
                </Form.Group>

                <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} >

                    {tovars_for_task.length === 0 ?
                        <Form.Label
                            htmlFor="file"
                            className={`${styles.custom_file_inputLabelinput}`}
                        >

                            Выберите файл с данными

                        </Form.Label>
                        :
                        <Form.Label
                            htmlFor="file"
                            className={`${styles.custom_file_inputLabelinput} ${styles.isGoLoadingFile}`}
                        >

                            Файл подготовлен к загрузке

                        </Form.Label>

                    }
                    <Form.Control
                        className={`${styles.custom_file_input} ${styles.file}`}
                        name='file'
                        id="file"
                        key="tovars_for_task"
                        type='file'
                        placeholder="Не менее 6 символов"
                        onChange={(e) => handleFile(e)}
                    />
                </Form.Group>

                <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} >
                    <DropdownButton

                    onSelect={ (eventKey)=> handleSelect(eventKey)} 
                    
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
                    <Button
                        className={styles.autx_btn}
                        onClick={() => create_task()}
                        variant="outline-success">Создать
                    </Button>
                </Form.Group>
            </Form>


    );
}

export default observer(CreateTask_form);