import React, { useContext, useState, useEffect } from 'react';

import styles from './createTask_form.module.css'
import *  as  XLSX from "xlsx";
import { Context } from '../../index';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';


const CreateTask_form = () => {

    const [task_name, setTask_name] = useState('')
    const [tovars_for_task, setTovars_from_task] = useState([])

    useEffect(() => {
        if (tovars_for_task.length !== 0) {
            console.log("tovars_for_task====>", tovars_for_task);
        }

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


    return (
        <div>
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
                        onChange={e => setTask_name(e.target.value)}
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
                            for="file"
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
                <Form.Group className="mb-3">
                    <Button
                        className={styles.autx_btn}
                        // onClick={() => {}}
                        variant="outline-success">Создать
                    </Button>
                </Form.Group>
            </Form>

        </div>

    );
}

export default observer(CreateTask_form);