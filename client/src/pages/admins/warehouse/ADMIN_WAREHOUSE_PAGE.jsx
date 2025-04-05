import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './admin_warehouse_page.module.css'



import CreateTovar_form from '../../../components/FORMS/CreateTovar_form/CreateTovar_form';
import List_warehouse from '../../../components/List_warehouse/List_warehouse';


const ADMIN_WAREHOUSE_PAGE = () => {

    const [task_name, setTask_name] = useState(null);
    const { tovar_store } = useContext(Context);





    return (
        <div className={styles.main}>
            {tovar_store.isCreate && !tovar_store.isSearch ?
                <CreateTovar_form></CreateTovar_form>
                :
                <List_warehouse></List_warehouse>
            }

            
            



        </div>
    )
}

export default observer(ADMIN_WAREHOUSE_PAGE)