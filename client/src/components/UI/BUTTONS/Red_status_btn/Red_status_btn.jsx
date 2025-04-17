import { observer } from "mobx-react-lite"

import styles from './red_status_btn.module.css'
import { AiOutlineStop } from "react-icons/ai";


const Red_status_btn = ({ btn_function }) => {

    return (
        <div>
            <div onClick={btn_function} className={styles.button4} >
                <AiOutlineStop />
            </div>
        </div>

    )
}

export default observer(Red_status_btn)