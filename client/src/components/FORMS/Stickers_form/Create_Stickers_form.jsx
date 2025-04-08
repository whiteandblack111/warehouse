import React, { useContext, useState, useEffect, useRef } from 'react';


import BtwJS from 'btw-js';
import styles from './create_Stickers_form.module.css'
import *  as  XLSX from "xlsx";
import { Context } from '../../../index';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Help_Service from '../../../services/Help_Service';




const Create_Stickers_form = () => {

    const [barcode, setBarcode] = useState('');
    const [sticker_file, setSticker_file] = useState(null);
    const [translit_name, setTratslit_name] = useState('');
    const [shop_name, setShop_name] = useState('Установите магазин');

    // console.log("window.BtwJS=======>", BtwJS)
    const { tovar_store } = useContext(Context);


    useEffect(() => {

    }, [sticker_file])

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const translit_name = await Help_Service.translit_text(file.name);
        const trim_name = translit_name.trim()
        setTratslit_name(trim_name)

        setSticker_file(file)
    }

    const handleSelect = (evt) => {
        setShop_name(evt)
        console.log(evt)
    }


    const { sticker_store } = useContext(Context);
    const create_sticker = async (
        barcode,
        shop_name,
        sticker_file,
        tovar_id

    ) => {

        let form_data = new FormData();

        form_data.append("barcode", barcode);
        form_data.append("shop_name", shop_name);
        form_data.append("sticker_file", sticker_file);
        form_data.append("translit_name", translit_name);
        form_data.append("tovar_id", tovar_id);

        // console.log("sticker_file.name====>", sticker_file.name) 

        await sticker_store.create(form_data)

    }


    return (
        <Form className={styles.container}>
            <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                <Form.Label
                    className={styles.inputLabel}
                >Добавление штрихкода магазина</Form.Label>
                <Form.Control
                    className={styles.input}
                    key="barcode"
                    type='text'
                    placeholder="Введите BARCOD"
                    onChange={
                        (e) => setBarcode(e.target.value)
                    }
                    value={barcode}
                />
            </Form.Group>

            <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} >

                {!sticker_file ?
                    <Form.Label
                        htmlFor="file"
                        className={`${styles.custom_file_inputLabelinput}`}
                    >

                        Выберите файл штрихкода

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
                    placeholder="Файл штрихкода"
                    onChange={(e) => handleFile(e)}
                />
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
                <Button
                    className={styles.autx_btn}
                    onClick={() => create_sticker(
                        barcode,
                        shop_name,
                        sticker_file,
                        tovar_store.tovar.id
                    )}
                    variant="outline-success">Создать
                </Button>
            </Form.Group>
        </Form>


    );
}

export default observer(Create_Stickers_form);