import { observer } from "mobx-react-lite"

import styles from './fiolet_border_btn.module.css'


const Fiolet_border_btn = (props) => {

    return (

        <div
            onClick={() => { props.btn_click_callbackFunction()}}
            className={`${styles.fiolet_border_btn} ${props.className}`}>
            <span className={`${styles.span} ${props.className_text}`}>
                {props.children}
            </span>
        </div>

    )
}

export default observer(Fiolet_border_btn)