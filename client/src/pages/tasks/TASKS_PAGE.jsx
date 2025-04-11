import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

import styles from './tasks_page.module.css'

import CreateTask_form from '../../components/FORMS/CreateTask_form/CreateTask_form';
import Task_list from '../../components/Task_list/Task_list';



const ADMIN_TASK_LIST_PAGE = () => {

  
    const {task_store} = useContext(Context)

    const screenHeight = window.screen.height

    // console.log("task_store.isCreate===  ", task_store.isCreate)
    // console.log("task_store.isSearch===  ", task_store.isSearch)



    return (
        <div className={styles.main}>
 
            <Task_list></Task_list>

            {
                task_store.isCreate && !task_store.isSearch ?
                <CreateTask_form></CreateTask_form>
                    :
                    <></>
            }


        </div>
    )
}

export default observer(ADMIN_TASK_LIST_PAGE)