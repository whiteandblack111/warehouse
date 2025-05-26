import React, { useContext, useState, useEffect, useMemo } from 'react';


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
import Light_neon_input from '../../UI/INPUTS/Light_neon_input/Light_neon_input';
import Close_btn from '../../UI/BUTTONS/Close_btn/Close_btn';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particle_options } from '../../../utils/particle_options';



const Create_Stickers_form = () => {
    const [init, setInit] = useState(false);

    const [barcode, setBarcode] = useState('');
    const [sticker_file, setSticker_file] = useState(null);
    const [translit_name, setTratslit_name] = useState('');
    const [shop_name, setShop_name] = useState('Установите магазин');
    const [warehouse_ID, setWarehouse_ID] = useState('');

    // console.log("window.BtwJS=======>", BtwJS)
    const { tovar_store } = useContext(Context);
    const { sticker_store } = useContext(Context);


    useEffect(() => {
        initParticlesEngine(async (engine) => {

            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        return (
            setInit(false)
        )
    }, [])

    const particlesLoaded = (container) => {
        // console.log(container);
    };

    const options = useMemo(
        () =>
            (particle_options),
        [],
    );

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

    const close_stickerForm = () => {
        sticker_store.setIsCreate(false)
    }


    const create_sticker = async () => {

        let form_data = new FormData();

        form_data.append("barcode", barcode);
        form_data.append("shop_name", shop_name);
        form_data.append("sticker_file", sticker_file);
        form_data.append("translit_name", translit_name);
        form_data.append("tovar_id", tovar_store.tovar.id);
        form_data.append("warehouse_ID", warehouse_ID);




        console.log("barcode>>>> ", barcode)
        console.log("shop_name>>>> ", shop_name)
        console.log("tovar_store.tovar.id>>>> ", tovar_store.tovar.id)
        console.log("warehouse_ID>>>> ", warehouse_ID)


        const sticker = await sticker_store.create(form_data);

        tovar_store.allTovars.map((tovar) => {

            if (tovar.id === tovar_store.tovar.id) {

                tovar.stickers.push(sticker)
            }
        })

        sticker_store.setIsCreate(false)
    }


    return (

        <div className={styles.modal_container} >
            {
                init ?
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                    />
                    :
                    <></>

            }

            <Form className={styles.container}>
                <Close_btn
                    onClick={close_stickerForm}
                ></Close_btn>
                <Form.Label
                    className={styles.inputLabel}
                >Добавление стикера магазина</Form.Label>
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >

                    <Light_neon_input
                        forTypeValue={"number"}
                        placeholder="Введите BARCOD"
                        key="barcode"
                        id="barcode"
                        type='text'
                        onChange={setBarcode}
                        value={barcode}
                    ></Light_neon_input>
                </Form.Group>

                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >

                    <Light_neon_input
                        placeholder="Артикул товара"
                        key="warehouse_ID"
                        id="warehouse_ID"
                        type='text'
                        onChange={setWarehouse_ID}
                        value={warehouse_ID}
                    ></Light_neon_input>
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
                        onClick={() => create_sticker()}
                        variant="outline-success">Создать
                    </Button>
                </Form.Group>
            </Form>

        </div>
    );
}

export default observer(Create_Stickers_form);