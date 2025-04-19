import { observer } from "mobx-react-lite"

import styles from './yellow_status_btn.module.css'

import { Children } from "react";


const Yellow_status_btn = (props) => {

    return (
        <div>
            <div onClick={()=>{props.btn_function(props.boolParams)}} className={styles.button4} >
               {props.children}
            </div>
        </div>

    )
}

export default observer(Yellow_status_btn)