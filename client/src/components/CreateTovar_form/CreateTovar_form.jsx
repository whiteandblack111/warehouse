import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './createTovar_form.module.css'
import { Context } from '../../index';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';


const CreateTovar_form = () => {

    const [manufacturer_ID, setManufacturer_ID] = useState('');
    const [warehouse_ID, setWarehouse_ID] = useState('');
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tovar_img, setTovar_img] = useState('');


    const createFile_for_tovar = () => {


    }


    return (
        <div>
            <Form className={styles.container}>
                <div>
                    {/* ========== Изображение товара ============== */}
                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} controlId="exampleForm.ControlInput1">
                       
                        <div className={styles.formTitle}>Создать товар на складе</div>

                        {!tovar_img ?

                            <Form.Label
                                for="file"
                                className={`${styles.custom_file_inputLabelinput}`}
                            >

                                Выберите изображение товара

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
                            onChange={(e) => createFile_for_tovar(e)}
                        />
                    </Form.Group>

                </div>


                {/* ==========  manufacturer_ID  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} controlId="exampleForm.ControlInput1">
                    <Form.Label
                        className={styles.inputLabel}
                    >Производитель ID</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="manufacturer_ID"
                        type="text"
                        placeholder="Manufacturer_ID"
                        onChange={e => setManufacturer_ID(e.target.value)}
                        value={manufacturer_ID}
                    />
                </Form.Group>

                {/* ==========  name  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} controlId="exampleForm.ControlInput1">
                    <Form.Label
                        className={styles.inputLabel}
                    >Название товара</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="name"
                        type="text"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </Form.Group>

                {/* ==========  name  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} controlId="exampleForm.ControlInput1">
                    <Form.Label
                        className={styles.inputLabel}
                    >Количество товара</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="quantity"
                        type="text"
                        placeholder="Quantity"
                        onChange={e => setQuantity(e.target.value)}
                        value={quantity}
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                    <Button
                        className={styles.autx_btn}
                        onClick={() => { }}
                        variant="outline-success">Создать
                    </Button>
                </Form.Group>
            </Form>

        </div>

    );
}

export default observer(CreateTovar_form);