import { observer } from "mobx-react-lite"
import styles from './red_btn.module.css'



const Red_btn = (props) => {

    return (
        <div>
            <div 
            onClick={()=>{props.onClick()}} 
            className={styles.button4} 
            style={props.style}
            >
               
                {props.children}
            </div>
        </div>

    )
}

export default observer(Red_btn)