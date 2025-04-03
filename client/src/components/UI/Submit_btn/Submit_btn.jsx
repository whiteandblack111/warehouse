
import { NavLink } from "react-router-dom";
import styles from "./submit_btn.module.css"

const Submit_btn = (props) => {


    return (
        <div className={styles.button}>
            

            <div className={styles.wrap}>
                <NavLink to={props.path} className={styles.button}>{props.children}</NavLink>
            </div>
        </div>
    )
}

export default Submit_btn

