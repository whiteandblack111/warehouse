import React, { useContext, useEffect } from 'react';
import styles from './task_list.module.css'
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Task_one from '../Task_one/Task_one';

const Task_list = () => {


    const { task_store } = useContext(Context)
    const { user_store } = useContext(Context)


    return (
        <div className={styles.container}>

            <div className={styles.task_box}>
                {
                    task_store.allTasks.map((task) => {

                        return <Task_one
                            key={task.id}
                            task={task}
                        ></Task_one>

                    })
                }
            </div>

        </div>

    )
};

export default observer(Task_list);