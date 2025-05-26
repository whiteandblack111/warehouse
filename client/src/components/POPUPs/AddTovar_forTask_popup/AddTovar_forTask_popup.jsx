import { useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite"


import styles from './addTovar_forTask_popup.module.css';
import Glaassmorphism_btn from "../../UI/BUTTONS/Glaassmorphism_btn/Glaassmorphism_btn";
import { Context } from "../../..";
import Close_btn from "../../UI/BUTTONS/Close_btn/Close_btn";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Light_neon_input from "../../UI/INPUTS/Light_neon_input/Light_neon_input";
import Form from 'react-bootstrap/Form';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particle_options } from "../../../utils/particle_options";
import { statuses_tovar_for_task } from "../../../utils/entity_statuses";


const AddTovar_forTask_popup = (props) => {
    const [init, setInit] = useState(false);
    const [task_id, setTask_id] = useState('Укажите поставку');
    const [tovar_quantity, setTovar_quantity] = useState(0);
    const [maximum_allowed_quantity, setMaximum_allowed_quantity] = useState(0);


    const { tovar_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { tovar_forTask_store } = useContext(Context);


    useEffect(() => {
        initParticlesEngine(async (engine) => {

            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
        task_store.get_all_tasks()


        return (
            setInit(false)
        )
    }, []);

    const particlesLoaded = (container) => {
        // console.log(container);
    };

    const options = useMemo(
        () =>
            (particle_options),
        [],
    );

    const { interface_store } = useContext(Context);
    const close_addTovar_forTask_popup = () => {
        interface_store.setIsOpen_addTovar_forTask(false)
    }

    const handleSelect_taskNumber = async (evt) => {
        setTask_id(evt);
        return evt
    }

    const handleSelect_tovarQuantity = async (evt) => {
        console.log("evt ", evt)
        console.log("quantity ", Number(tovar_store.tovar.quantity))
        if (Number(tovar_store.tovar.quantity) < evt) {
            setTovar_quantity(tovar_store.tovar.quantity);
            return
        }
        setTovar_quantity(evt);
        return
    }

    const addTovar_forTask = async () => {

        const id = task_id
        await task_store.get_one(id)

        await tovar_store.getOne_tovar_warehouse(tovar_store.tovar.id)

        let stickerMagaz = null;



        await tovar_store.tovar.stickers.map((sticker) => {
            if (sticker.shop_name === task_store.task.shop_name) {
                stickerMagaz = sticker
            }
        })

        const formData = {
            warehouse_ID: stickerMagaz.warehouse_ID,
            barcode: stickerMagaz.barcode,
            name: tovar_store.tovar.name,
            cartons_required: tovar_quantity,
            taskId: task_store.task.id,
            tovarForWarehouseId: tovar_store.tovar.id,
            stickerId: stickerMagaz.id,
            status: statuses_tovar_for_task.this_tovar_added_for_delivery.value
        }

        console.log("formData>>>> ", formData)
        // console.log("tovar_store.tovar>>>> ", tovar_store.tovar)

        await tovar_forTask_store.add_tovar_forTask(formData)


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
            <div className={styles.obertka}>
                <div className={styles.modal} >
                    <Close_btn
                        onClick={close_addTovar_forTask_popup}
                    ></Close_btn>
                    <Form className={styles.content_box}>

                        <h4 className={styles.modal__title} >Выберите номер поставки</h4>
                        <DropdownButton

                            onSelect={(eventKey) => handleSelect_taskNumber(eventKey)}

                            className={`btn_glass ${styles.dropdown_btn} `}
                            id="dropdown-basic-button"
                            title={task_id}
                        >
                            {
                                task_store.allTasks.map((task) => {
                                    return <Dropdown.Item
                                        key={task.id}
                                        eventKey={task.id}
                                    >{task.id}</Dropdown.Item>
                                })
                            }

                        </DropdownButton>



                        <div className={`${styles.box} ${styles.tovar_box}`}>

                            <Light_neon_input
                                forTypeValue={"number"}
                                type="text"
                                placeholder="Количество товара"
                                onChange={handleSelect_tovarQuantity}
                                forKey={task_store.task.id}
                            ></Light_neon_input>
                        </div>

                        <Glaassmorphism_btn
                            onClick={addTovar_forTask}
                        >Добавить</Glaassmorphism_btn>


                    </Form>


                </div>
            </div>

        </div>
    )
}


export default observer(AddTovar_forTask_popup)