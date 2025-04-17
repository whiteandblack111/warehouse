import { observer } from "mobx-react-lite"

import styles from './сhangeStatus_tovarTask.module.css'
import Green_status_btn from "../../UI/BUTTONS/Green_status_btn/Green_status_btn"
import Yellow_status_btn from "../../UI/BUTTONS/Yellow_status_btn/Yellow_status_btn"
import Red_status_btn from "../../UI/BUTTONS/Red_status_btn/Red_status_btn"
import { useContext, useRef, useState } from "react"
import { Context } from "../../.."

import { motion } from 'framer-motion';





const ChangeStatus_tovarTask = ({ isOpen }) => {
    const [tovarStatus, setTovarStatus] = useState("default")

    const { tovar_store } = useContext(Context);
    const { tovar_forTask_store } = useContext(Context);


    const сhangeStatus_tovarTask = async (status) => {
        setTovarStatus(status)
        console.log(status)

        if (tovarStatus === "done") {
            tovar_forTask_store.setStatus(status)

            return ""
        }
        if (tovarStatus === "several") {
            tovar_forTask_store.setStatus(status)

            return ""
        }
        if (tovarStatus === "cancel") {
            tovar_forTask_store.setStatus(status)

            return ""
        }

    }

 

    return (
        <div className={
            !isOpen
            ?
            styles.сhangeStatus_tovarTask_popup
            :
            `${styles.сhangeStatus_tovarTask_popup} ${styles.open}`
        }

        >

            <div className={styles.row_btns}

            >
                <Green_status_btn>
                    onClick={() => { сhangeStatus_tovarTask("done") }}
                </Green_status_btn>
                <Yellow_status_btn>
                    onClick={() => { сhangeStatus_tovarTask("several") }}
                </Yellow_status_btn>
                <Red_status_btn>
                    onClick={() => { сhangeStatus_tovarTask("cancel") }}
                </Red_status_btn>
            </div>
            <div className={styles.row_btns} >
                <button>asdasd</button>
            </div>

        </div>
    )

}

export default observer(ChangeStatus_tovarTask)