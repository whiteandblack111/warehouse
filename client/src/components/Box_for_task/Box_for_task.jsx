
import { observer } from "mobx-react-lite"
import styles from './box_for_task.module.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../index';
import 'animate.css';

import { BsFillBoxSeamFill } from "react-icons/bs";
import { BsFillBox2Fill } from "react-icons/bs";


const Box_for_task = (props) => {

    const [current_URL, setCurrent_URL] = useState('');



    useEffect(() => {

        get_current_host_url()
        console.log("tovar_for_boxTasks-=-=-> ", props.box.tovar_for_boxTasks)

    }, [])

    const get_current_host_url = () => {
        if (typeof window !== 'undefined') {
            let currentUrl = window.location.href.split(':')[1];
            let http = window.location.href.split(':')[0];
            currentUrl = currentUrl.split('//')[1];
            currentUrl = currentUrl.split('/')[0];

            let build_url;
            if (currentUrl === 'localhost') {
                setCurrent_URL(`${http}://localhost:7000/`)
                build_url = `${http}://localhost:7000/`
            }

            if (currentUrl !== 'localhost') {
                setCurrent_URL(`${http}://${currentUrl}/files/`)
                build_url = `${http}://${currentUrl}/files/`
            }

            setCurrent_URL(build_url)
            return build_url
        }
    }

    return (
        <div className={styles.container}
        >
            <div className={styles.box_number}>
                <BsFillBoxSeamFill className={styles.box_icon} />
                <p>№ {props.box_number}</p>
            </div>


            <div className={styles.wrapper_box}>
                {props.box.tovar_for_boxTasks.map((tovar) => {
                    return (
                        <div className={styles.tovar_card}>
                            <img
                                className={styles.photo_for_tovars}
                                src={`${current_URL}${tovar.tovar_for_task.tovar_for_warehouse.photo_for}`}
                                alt="Фото товара"
                            />
                            <p className={styles.tovar_quantity}>
                                <span>Шт:</span>
                                <span>{tovar.quantityTovar}</span>

                            </p>
                            <p className={styles.tovar_barcode}>
                                {/* <span>Ш-К:</span> */}
                                <span className={styles.barcode_text}>{tovar.tovar_for_task.sticker.barcode}</span>

                            </p>

                        </div>
                    )
                })
                }
            </div>





        </div>
    )

}

export default observer(Box_for_task)