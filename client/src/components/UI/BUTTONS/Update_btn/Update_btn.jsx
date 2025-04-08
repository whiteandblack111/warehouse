import { observer } from "mobx-react-lite"

import styles from './update_btn.module.css'


const Update_btn = () => {



    return (
        <div>
            <div className={styles.yellov_btn}><span>children</span></div>
        </div>
    )
}

export default observer(Update_btn)