import { observer } from "mobx-react-lite"

import styles from './green_status_btn.module.css'
import { MdDoneOutline } from "react-icons/md";


const Green_status_btn = (props) => {

    return (
        <div>
            <div onClick={()=>{props.btn_function()}} className={styles.button4} >
                {props.children}
            </div>
        </div>

    )
}

export default observer(Green_status_btn)