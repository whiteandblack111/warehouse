import { observer } from "mobx-react-lite"
import styles from './open_close_btn.module.css'



const Open_close_btn = (props) => {



    return (

        <div
            onClick={(e) => { props.onClick(true) }} className={styles.button}
            
        ></div>
    )
}

export default observer(Open_close_btn)