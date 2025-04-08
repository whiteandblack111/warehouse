import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './admin_warehouse_page.module.css'



import CreateTovar_form from '../../../components/FORMS/CreateTovar_form/CreateTovar_form';
import List_warehouse from '../../../components/List_warehouse/List_warehouse';


const ADMIN_WAREHOUSE_PAGE = () => {

    const { tovar_store } = useContext(Context);

    const screenHeight = window.screen.height
    // console.log("screenHeight---->>>>>> ", screenHeight)

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

export default observer(ADMIN_WAREHOUSE_PAGE)