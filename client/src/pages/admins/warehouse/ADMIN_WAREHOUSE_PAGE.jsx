import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './admin_warehouse_page.module.css'



import CreateTovar_form from '../../../components/CreateTovar_form/CreateTovar_form';
import Task_list from '../../../components/Task_list/Task_list';

const ADMIN_WAREHOUSE_PAGE = () => {

    const [task_name, setTask_name] = useState(null)




    return (
        <div className={styles.main}>

            <CreateTovar_form></CreateTovar_form>

        </div>
    )
}

export default observer(ADMIN_WAREHOUSE_PAGE)