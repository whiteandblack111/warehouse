import { observer } from "mobx-react-lite"

import styles from './minus_btn.module.css'
import { LuPackageMinus } from "react-icons/lu";


const Minus_btn = ({minus_quantity}) => {

    return (
        <div>
            <div onClick={minus_quantity} class={styles.button4} >
                <LuPackageMinus className={styles.text_color}/>
            </div>
        </div>

    )
}

export default observer(Minus_btn)