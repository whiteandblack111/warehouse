import { observer } from "mobx-react-lite"
import styles from './red_status_btn.module.css'



const Red_status_btn = (props) => {

    return (
        <div>
            <div onClick={()=>{props.btn_function()}} className={styles.button4} >
               
                {props.children}
            </div>
        </div>

    )
}

export default observer(Red_status_btn)