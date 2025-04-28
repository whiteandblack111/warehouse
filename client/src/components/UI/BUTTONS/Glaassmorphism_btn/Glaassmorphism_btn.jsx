import { observer } from "mobx-react-lite"

import desktop_styles from './glaassmorphism_btn.module.css'




const Glaassmorphism_btn = (props) => {



    return (

        <div className={desktop_styles.btn}
            ref={props.ref}
            onClick={() => { props.onClick() }}
        >
            <p className={desktop_styles.a_text}>{props.children}</p>
        </div>
    )

}


export default observer(Glaassmorphism_btn);
