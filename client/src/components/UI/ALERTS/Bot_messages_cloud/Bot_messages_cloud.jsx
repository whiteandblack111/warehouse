import { observer } from "mobx-react-lite"
import styles from './bot_messages_cloud.module.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../../../index';
import 'animate.css';


const Bot_comment_cloud = (props) => {
    
    const [boxClassName, setBoxClassName] = useState(styles.cloud);
    const { bot_messages_store } = useContext(Context);

    useEffect(() => {
        if (bot_messages_store.is_Open_Bot === true) {
            setBoxClassName(`${styles.cloud} animate__animated animate__bounceIn`)
            // console.log(bot_messages_store.bot_Message)
        }
        if (bot_messages_store.is_Open_Bot === false) {
            setBoxClassName(`${styles.cloud} animate__animated animate__bounceOut`)
        }

    }, [bot_messages_store.is_Open_Bot])

    return (
        <div className={boxClassName}
            animate={{ rotate: 360 }}
        >
            {props.children?
                props.children
                :
                bot_messages_store.bot_Message
            }
        </div>
    )

}

export default observer(Bot_comment_cloud)