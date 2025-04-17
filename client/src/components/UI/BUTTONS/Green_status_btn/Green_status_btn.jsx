import { observer } from "mobx-react-lite"

import styles from './green_status_btn.module.css'
import { MdDoneOutline } from "react-icons/md";


const Green_status_btn = ({ btn_function }) => {

    return (
        <div>
            <div onClick={btn_function} className={styles.button4} >
                <MdDoneOutline />
            </div>
        </div>

    )
}

export default observer(Green_status_btn)