import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './admin_orders_page.module.css'





const ADMIN_ORDERS_PAGE = () => {

    const [orders, setOrders] = useState([]);
    const { tovar_store } = useContext(Context);

    return(
        <div>

        </div>
    )

}

export default observer(ADMIN_ORDERS_PAGE);