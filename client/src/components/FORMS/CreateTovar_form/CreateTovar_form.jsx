import React, { useContext, useState } from 'react';
import styles from './createTovar_form.module.css'
import { Context } from '../../../index';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';



const CreateTovar_form = () => {

    const [tovar_photo, setTovar_img] = useState('');
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [manufacturer_ID, setManufacturer_ID] = useState('');
    const [quantity, setQuantity] = useState('');


    const { tovar_store } = useContext(Context);

    const createFile_for_tovar = async (
        tovar_photo,
        name,
        barcode,
        manufacturer_ID,
        quantity,
    ) => {
        let form_data = new FormData();

        form_data.append("tovar_photo", tovar_photo);
        form_data.append("name", name);
        form_data.append("barcode", barcode);
        form_data.append("manufacturer_ID", manufacturer_ID);
        form_data.append("quantity", quantity);

        await tovar_store.create_tovar_warehouse(form_data)

    }

    const handleFile = (e) => {
        setTovar_img(e.target.files[0])
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
                        className={styles.input}
                        key="name"
                        type="text"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </Form.Group>

                {/* ==========  Штрих-код  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
                    <Form.Label
                        className={styles.inputLabel}
                    >Штрих-код</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="barcode"
                        type="text"
                        placeholder="Штрих-код"
                        onChange={e => setBarcode(e.target.value)}
                        value={barcode}
                    />
                </Form.Group>




                {/* ==========  manufacturer_ID  ============== */}
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} >
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
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`}>
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





                {/* ==========  BUTTON  ============== */}
                <Form.Group className="mb-3" >

                    <Button
                        className={styles.autx_btn}
                        onClick={() => {
                            createFile_for_tovar(
                                tovar_photo,
                                name,
                                barcode,
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