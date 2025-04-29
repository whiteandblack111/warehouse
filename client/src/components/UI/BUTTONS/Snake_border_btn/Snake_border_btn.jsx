import { observer } from "mobx-react-lite"
import styles from "./snake_border_btn.module.css"


const Snake_border_btn = (props) => {


    return(
        <div className={styles.container_btn}>
            <div className={styles.span}></div>
            <span className={styles.span}></span>
            <span className={styles.span}></span>
            <span className={styles.span}></span>
            {props.children}
        </div>
    )
}

export default observer(Snake_border_btn);