import { observer } from "mobx-react-lite"

import styles from './plus_btn.module.css'
import { LuPackagePlus } from "react-icons/lu";



const Plus_btn = ({ plus_quantity }) => {

    return (
            <div onClick={plus_quantity} className={styles.button4} >
                <LuPackagePlus className={styles.text_color} />
            </div>

    )
}

export default observer(Plus_btn)