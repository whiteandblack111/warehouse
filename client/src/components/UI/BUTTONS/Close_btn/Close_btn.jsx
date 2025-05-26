import { observer } from "mobx-react-lite"
import styles from './close_btn.module.css'
import { FaWindowClose } from "react-icons/fa";







const Close_btn = (props) => {


    return (
        <div className={styles.close_btn}
            onClick={() => { props.onClick() }}
        >
            {props.children
                ?
                props.children
                :
                <FaWindowClose />
            }
        </div>
    )
}

export default observer(Close_btn);