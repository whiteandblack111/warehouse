import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';

import styles from './admin_task_list_page.module.css'

import CreateTask_form from '../../../components/FORMS/CreateTask_form/CreateTask_form';
import Task_list from '../../../components/Task_list/Task_list';

const ADMIN_TASK_LIST_PAGE = () => {

    const [task_name, setTask_name] = useState(null)
    const [tovars_for_task, setTovars_from_task] = useState([])

    useEffect(() => {
        if (tovars_for_task.length !== 0) {
            console.log("tovars_for_task====>", tovars_for_task);
        }

    }, [tovars_for_task])

    const taskList = [

    ]






    return (
        <div className={styles.main}>

            <CreateTask_form></CreateTask_form>
            <Task_list task_list={taskList}></Task_list>

        </div>
    )
}

export default observer(ADMIN_TASK_LIST_PAGE)