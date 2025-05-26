import { observer } from "mobx-react-lite"
import styles from "./loader.module.css"





const Loader = () => {

    return (
        <div className={styles.loader_box}>
            <div className={styles.loader}>
            <div className={`${styles.face} ${styles.face1}`} >
                <div className={styles.circle}></div>
            </div>

            <div className={`${styles.face} ${styles.face2}`} >
                <div className={styles.circle}></div>
            </div>

            <div className={`${styles.face} ${styles.face3}`} >
                <div className={styles.circle}></div>
            </div>
            <div className={`${styles.face} ${styles.face4}`} >
                <div className={styles.circle}></div>
            </div>
        </div>
        </div>
        
    )
}

export default observer(Loader)