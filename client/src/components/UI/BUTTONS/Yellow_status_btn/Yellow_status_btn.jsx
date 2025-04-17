import { observer } from "mobx-react-lite"

import styles from './yellow_status_btn.module.css'
import { TbSquareHalf } from "react-icons/tb";


const Yellow_status_btn = ({ btn_function }) => {

    return (
        <div>
            <div onClick={btn_function} className={styles.button4} >
                <TbSquareHalf />
            </div>
        </div>

    )
}

export default observer(Yellow_status_btn)