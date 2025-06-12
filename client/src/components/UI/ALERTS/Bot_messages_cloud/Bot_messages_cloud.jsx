import { observer } from "mobx-react-lite"
import styles from './bot_messages_cloud.module.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../../../index';
import 'animate.css';
import Close_btn from "../../BUTTONS/Close_btn/Close_btn";


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

    const close_Bot_comment_cloud = () => {
        bot_messages_store.set_Open_Bot(false)
    }

    return (
        <div className={bot_messages_store.isErrors === false ?
            boxClassName
            :
            `${boxClassName} ${styles.isErrors}`
        }
            animate={{ rotate: 360 }}
        >
            <Close_btn
                onClick={close_Bot_comment_cloud}
            ></Close_btn>
            {bot_messages_store.isErrors !== false ? // Если есть ошибки при создании поставки
                <p className="error_barcode_title">Исправьте: </p>
                :
                null
            }
            {props.children ?
                props.children
                :
                bot_messages_store.bot_Message
            }
        </div>
    )

}

export default observer(Bot_comment_cloud)