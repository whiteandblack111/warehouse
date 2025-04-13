import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import styles from './workers_page.module.css'
import Loader from './../../components/PAGE_COMPONENTS/Loader/Loader';




const WORKERS_PAGE = () => {

    const [orders, setOrders] = useState([]);
    const { tovar_store } = useContext(Context);




    useEffect(() => {

        tovar_store.setIsLoading(true)
        setTimeout(() => {
            tovar_store.setIsLoading(false)
        }, 500);
    }, [])


    if (tovar_store.isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            WORKERS
        </div>
    )

}

export default observer(WORKERS_PAGE);