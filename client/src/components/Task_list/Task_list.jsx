import React, { useContext, useState } from 'react';

import styles from './task_list.module.css'
import { Context } from '../../index';


import { observer } from 'mobx-react-lite';
import Task_one from '../Task_one/Task_one';


const Task_list = (props) => {
    

    const { user_store } = useContext(Context)

    return (
        <div className={styles.container}>
            {
                props.task_list.map(
                    task => <Task_one key={task.id}></Task_one>)
            }

        </div>
    )
};

export default observer(Task_list);