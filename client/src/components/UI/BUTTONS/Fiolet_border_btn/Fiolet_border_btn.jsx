import { observer } from "mobx-react-lite"

import styles from './fiolet_border_btn.module.css'


const Fiolet_border_btn = ({ btn_click_callbackFunction, children }) => {



    return (

        <div
            onClick={() => { btn_click_callbackFunction() }}
            className={styles.fiolet_border_btn}><span>{children}</span>
        </div>

    )
}

export default observer(Fiolet_border_btn)