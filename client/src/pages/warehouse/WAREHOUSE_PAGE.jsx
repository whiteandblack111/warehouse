import React, { useContext, useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import styles from './warehouse_page.module.css'



import CreateTovar_form from '../../components/FORMS/CreateTovar_form/CreateTovar_form';
import List_warehouse from '../../components/List_warehouse/List_warehouse';
import Loader from './../../components/PAGE_COMPONENTS/Loader/Loader';


const WAREHOUSE_PAGE = () => {

    // const { sticker_store } = useContext(Context);
    const { tovar_store } = useContext(Context);
    // const { user_store } = useContext(Context);


    useEffect(() => {
        getAll_tovars_warehouse()
    }, [])

    // useEffect(() => {
    //     getAll_tovars_warehouse()
    // }, [tovar_store.tovar])

    async function getAll_tovars_warehouse() {
        await tovar_store.getAll_tovars_warehouse();

        // tovar_store.setIsLoading(true)
        // setTimeout(() => {
        //     tovar_store.setIsLoading(false)
        // }, 500);
    }

    if (tovar_store.isLoading) {
        return <Loader></Loader>
    }


    return (
        <div className={styles.main}>

            <List_warehouse></List_warehouse>

            {
                tovar_store.isCreate && !tovar_store.isSearch ?
                    <CreateTovar_form></CreateTovar_form>
                    :
                    <></>
            }

        </div>
    )
}

export default observer(WAREHOUSE_PAGE)