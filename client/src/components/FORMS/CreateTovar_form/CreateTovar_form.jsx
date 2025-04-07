import React, { useContext, useState, useRef } from 'react';
import styles from './createTovar_form.module.css'
import { Context } from '../../../index';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';



const CreateTovar_form = () => {

    const [tovar_photo, setTovar_img] = useState('');
    const [name, setName] = useState('');
    const [manufacturer_ID, setManufacturer_ID] = useState('');
    const [quantity, setQuantity] = useState('');

    const { tovar_store } = useContext(Context);

    const createFile_for_tovar = async (
        tovar_photo,
        name,
        manufacturer_ID,
        quantity,
    ) => {
        let form_data = new FormData();

        form_data.append("tovar_photo", tovar_photo);
        form_data.append("name", name);
        form_data.append("manufacturer_ID", manufacturer_ID);
        form_data.append("quantity", quantity);

        const tovar = await tovar_store.create_tovar_warehouse(form_data);
        tovar_store.setIsCreate(false)
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

    return (
        <div>
            <Form className={styles.container}>
                <div>
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
                </div>


                {/* ==========  name  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Название товара</Form.Label>
                    <Form.Control
                        as="textarea" rows={4}
                        ref={input_name_ref}
                        className={`${styles.input} ${styles.textarea}`}
                        key="name"
                        type="text"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        onKeyUp={handler_keyUp_input_name}
                        value={name}
                    />
                </Form.Group>

                {/* ==========  manufacturer_ID  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Производитель ID</Form.Label>
                    <Form.Control
                        ref={input_manufacturer_ID_ref}
                        className={`${styles.input} ${styles.input_manufacturer_ID}`}
                        key="manufacturer_ID"
                        type="text"
                        placeholder="Manufacturer_ID"
                        onChange={e => setManufacturer_ID(e.target.value)}
                        onKeyUp={handler_keyUp_manufacturer_ID}
                        value={manufacturer_ID}
                    />
                </Form.Group>

                {/* ==========  quantity  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`}>
                    <Form.Label
                        className={styles.inputLabel}
                    >Количество товара</Form.Label>
                    <Form.Control
                        ref={input_quantity_ref}
                        className={`${styles.input} ${styles.input_quantity}`}
                        key="quantity"
                        type="text"
                        placeholder="Quantity"
                        onChange={e => setQuantity(e.target.value)}
                        onKeyUp={handler_keyUp_quantity}
                        value={quantity}
                    />
                </Form.Group>





                {/* ==========  BUTTON  ============== */}
                <Form.Group className="mb-3" >

                    <Button
                    ref={input_submit_ref}
                        className={styles.submit_btn}
                        onClick={() => {
                            createFile_for_tovar(
                                tovar_photo,
                                name,
                                manufacturer_ID,
                                quantity,
                            )
                        }}
                        variant="outline-success">Создать
                    </Button>
                </Form.Group>
            </Form>

        </div>

    );
}

export default observer(CreateTovar_form);