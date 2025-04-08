import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './task_list.module.css'
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Task_one from '../Task_one/Task_one';


const Task_list = () => {
    const [task_list, setTask_list] = useState([])

    // const { user_store } = useContext(Context)
    // const { sticker_store } = useContext(Context);
    const { task_store } = useContext(Context);


    useEffect(() => {
        get_all_tasks();

        console.log("task_list ===+++===> ", task_store.allTasks)
    }, [])

    useEffect(() => {
        get_all_tasks();
        setTask_list(task_store._allTasks)
        // console.log("allTasks ===+++===> ", task_store.allTasks)
    }, [task_store._task])

    async function get_all_tasks() {
        await task_store.get_all_tasks();


    }







    return (
        <div
            className={styles.container}>

            {/* <div className={styles.heading}>
                <div className={`${styles.headingItem} ${styles.id}`}>№</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.itemFoto}`}>Фото</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.Manufacturer_ID}`}>Manufacturer_ID</div>
                <div className={styles.line} ></div>


                <div className={`${styles.headingItem} ${styles.barcode}`}>Стикеры</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.name}`}>Название</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.quantity}`}>Кол-во</div>
            </div> */}

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