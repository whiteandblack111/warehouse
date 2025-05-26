import { observer } from "mobx-react-lite"
import styles from './bot_shadow_notification.module.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../../../index';


const Bot_shadow_notification = (props) => {

    const [boxClassName, setBoxClassName] = useState(styles.cloud);
    const { bot_messages_store } = useContext(Context);

    useEffect(() => {
        
        if (bot_messages_store.is_Open_Bot === true) {
            setBoxClassName(`${styles.point_light} ${styles.srart_pulsate}`);
        }

        if (bot_messages_store.is_Open_Bot === false) {
            setBoxClassName(`${styles.point_light} `)
        }

    }, [bot_messages_store.is_Open_Bot])

    return (
        <div className={boxClassName}>

        </div>
    )

}

export default observer(Bot_shadow_notification)