import { observer } from "mobx-react-lite"
import styles from './bot_shadow_notification.module.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../../../index';


const Bot_shadow_notification = (props) => {

    const [boxClassName, setBoxClassName] = useState(styles.cloud);
    const { bot_messages_store } = useContext(Context);

    useEffect(() => {

        if (bot_messages_store.is_Open_Bot === true && !bot_messages_store.isErrors) {
            setBoxClassName(`${styles.point_light} ${styles.srart_pulsate}`);
        }
        if (bot_messages_store.is_Open_Bot === true && bot_messages_store.isErrors) {
            setBoxClassName(`${styles.point_light} ${styles.srart_pulsate_error}`);
        }

        if (bot_messages_store.is_Open_Bot === false) {
            setBoxClassName(`${styles.point_light} `)
        }

    }, [bot_messages_store.is_Open_Bot])

    return (
        <div className={bot_messages_store.isErrors === false ?
            boxClassName
            :
            `${boxClassName} ${styles.isErrors}`
        }
        >

        </div>
    )

}

export default observer(Bot_shadow_notification)