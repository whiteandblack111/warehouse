import { observer } from "mobx-react-lite"
import styles from "./neon_wrapper.module.css"




const Neon_wrapper = (props) => {

    return(
        <div className={`${styles.neon_wrapper} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default observer(Neon_wrapper);