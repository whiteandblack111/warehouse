import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './createTovar_form.module.css'
import { Context } from '../../../index';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';

import Popup_fon from '../../PAGE_COMPONENTS/Popup_fon/Popup_fon';
import Neon_wrapper from '../../UI/EFFECTS/Neon_wrapper/Neon_wrapper';
import Glaassmorphism_btn from '../../UI/BUTTONS/Glaassmorphism_btn/Glaassmorphism_btn';
import Light_neon_input from '../../UI/INPUTS/Light_neon_input/Light_neon_input';
import Close_btn from '../../UI/BUTTONS/Close_btn/Close_btn';
import NeonGlass_dropdown from '../../UI/Dropdown/NeonGlass_dropdown';


const CreateTovar_form = () => {

    const [tovar_ownerId, setTovar_ownerId] = useState(null);
    const [tovar_photo, setTovar_img] = useState('');
    const [name, setName] = useState('');
    const [manufacturer_ID, setManufacturer_ID] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tovar_width, setTovar_width] = useState('');
    const [tovar_height, setTovar_height] = useState('');
    const [tovar_long, setTovar_long] = useState('');

    const { user_store } = useContext(Context);
    const { tovar_store } = useContext(Context);


    useEffect(() => {
        window.addEventListener("keydown", handler_keyUp_form);
        getAll_tovarOwners()
        return () => {
            window.removeEventListener("keydown", handler_keyUp_form);
        };

    }, []);

    const getAll_tovarOwners = async () => {
        await user_store.getAll_tovarOwners();
    }


    const create_tovar_warehouse = async (
        tovar_photo,
        name,
        manufacturer_ID,
        quantity,
    ) => {
        let form_data = new FormData();

        form_data.append("tovar_photo", tovar_photo);
        form_data.append("tovar_ownerId", tovar_ownerId);
        form_data.append("name", name);
        form_data.append("manufacturer_ID", manufacturer_ID);
        form_data.append("quantity", quantity);
        form_data.append("width", tovar_width);
        form_data.append("height", tovar_height);
        form_data.append("long", tovar_long);


        const tovar = await tovar_store.create_tovar_warehouse(form_data);

        console.log("tovar_store.isCreate tovar===>", tovar_store.isCreate)
        console.log("tovar_store.isSearch tovar===>", tovar_store.isSearch)
        console.log("CreateTovar_form tovar===>", tovar)

    }





    const input_tovar_photo_ref = useRef()
    const input_name_ref = useRef()
    const input_manufacturer_ID_ref = useRef()
    const input_quantity_ref = useRef()
    const input_submit_ref = useRef()

    const handleFile = (e) => {
        setTovar_img(e.target.files[0])
        input_name_ref.current.focus();
    }

    const handler_keyUp_input_name = (e) => {
        if (e.key === "Enter") {
            input_manufacturer_ID_ref.current.focus();
        }
    }

    const handler_keyUp_manufacturer_ID = (e) => {
        if (e.key === "Enter") {
            input_quantity_ref.current.focus();
        }
    }

    const handler_keyUp_quantity = (e) => {
        if (e.key === "Enter") {
            input_submit_ref.current.focus();
        }
    }

    const handler_keyUp_form = (e) => {
        if (e.keyCode === 27) {
            console.log('Close')
            tovar_store.setIsCreate(false)
        }
    }

    const close_createTovar_form = () => {
        tovar_store.setIsCreate(false)
    }

    const handleSelect_tovarOwner = (evt) => {
        setTovar_ownerId(evt)
    }

    return (
        <Popup_fon>
            <Neon_wrapper className={styles.Neon_wrapper}>
                <Form className={styles.container}>

                    <Close_btn
                        onClick={close_createTovar_form}
                    ></Close_btn>


                    {/* ========== Изображение товара ============== */}
                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} >

                        <div className={styles.formTitle}>Создать товар на складе</div>

                        {!tovar_photo ?

                            <Form.Label
                                htmlFor="tovar_photo"
                                className={`${styles.custom_file_inputLabelinput}`}
                            >

                                Выберите изображение товара

                            </Form.Label>

                            :
                            <Form.Label
                                htmlFor="tovar_photo"
                                className={`${styles.custom_file_inputLabelinput} ${styles.isGoLoadingFile}`}
                            >

                                Файл подготовлен к загрузке

                            </Form.Label>

                        }
                        <Form.Control
                            ref={input_tovar_photo_ref}
                            className={`${styles.custom_file_input} ${styles.file}`}
                            name='tovar_photo'
                            id="tovar_photo"
                            key="tovars_for_task"
                            type='file'
                            placeholder="Не менее 6 символов"
                            onChange={(e) => handleFile(e)}
                        />
                    </Form.Group>


                    {/* ========== Владелец товара ============== */}
                    <NeonGlass_dropdown
                        title="Назначьте владельца"
                        firstField="disabled"
                        selectsData={user_store.allOwners}
                        selectId="id"
                        selectName="firstname"
                        onSelect={(eventKey) => handleSelect_tovarOwner(eventKey)}
                    />

                    {/* ==========  name  ============== */}
                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                        <Form.Label
                            className={styles.inputLabel}
                        ></Form.Label>
                        <Form.Control
                            as="textarea" rows={4}
                            ref={input_name_ref}
                            className={`${styles.input} ${styles.textarea}`}
                            key="name"
                            type="text"
                            placeholder="Введите название товара"
                            onChange={e => setName(e.target.value)}
                            onKeyUp={handler_keyUp_input_name}
                            value={name}
                        />
                    </Form.Group>

                    {/* ==========  manufacturer_ID  ============== */}
                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                        <Light_neon_input
                            ref={input_manufacturer_ID_ref}
                            forKey="Производитель ID"
                            type="text"
                            placeholder="Manufacturer_ID"
                            onChange={setManufacturer_ID}
                            onKeyUp={handler_keyUp_manufacturer_ID}
                            value={manufacturer_ID}
                        ></Light_neon_input>
                    </Form.Group>

                    {/* ==========  quantity  ============== */}
                    <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`}>
                        <Light_neon_input
                            forTypeValue={"number"}
                            ref={input_quantity_ref}
                            forKey="quantity"
                            type="text"
                            placeholder="Количество товара"
                            onChange={setQuantity}
                            onKeyUp={handler_keyUp_quantity}
                            value={quantity}
                        ></Light_neon_input>
                    </Form.Group>

                    <div className={`${styles.rower} ${styles.width}`}>
                        <Light_neon_input
                            className={styles.margin_for__w_h_l}
                            forTypeValue={"number"}
                            ref={input_quantity_ref}
                            forKey="width"
                            type="text"
                            placeholder="ширина ММ"
                            onChange={setTovar_width}
                            onKeyUp={handler_keyUp_quantity}
                            value={tovar_width}
                        ></Light_neon_input>

                        <Light_neon_input
                            className={styles.margin_for__w_h_l}
                            forTypeValue={"number"}
                            ref={input_quantity_ref}
                            forKey="long"
                            type="text"
                            placeholder="высота ММ"
                            onChange={setTovar_long}
                            onKeyUp={handler_keyUp_quantity}
                            value={tovar_long}
                        ></Light_neon_input>

                        <Light_neon_input
                            className={styles.margin_for__w_h_l}
                            forTypeValue={"number"}
                            ref={input_quantity_ref}
                            forKey="height"
                            type="text"
                            placeholder="длинна ММ"
                            onChange={setTovar_height}
                            onKeyUp={handler_keyUp_quantity}
                            value={tovar_height}
                        ></Light_neon_input>
                    </div>


                    {/* ==========  BUTTON  ============== */}
                    <Form.Group className="mb-3" >

                        <Glaassmorphism_btn
                            ref={input_submit_ref}
                            onClick={() => {
                                create_tovar_warehouse(
                                    tovar_photo,
                                    name,
                                    manufacturer_ID,
                                    quantity,
                                )
                            }}
                        >Создать</Glaassmorphism_btn>
                    </Form.Group>
                </Form>

            </Neon_wrapper>
        </Popup_fon >
    );
}

export default observer(CreateTovar_form);