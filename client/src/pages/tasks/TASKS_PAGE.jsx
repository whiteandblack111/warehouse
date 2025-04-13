import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

import styles from './tasks_page.module.css'

import CreateTask_form from '../../components/FORMS/CreateTask_form/CreateTask_form';
import Task_list from '../../components/Task_list/Task_list';
import Loader from './../../components/PAGE_COMPONENTS/Loader/Loader';



const TASKS_PAGE = () => {

    const [task_list, setTask_list] = useState([])
    
        const { task_store } = useContext(Context);
    
    
        useEffect(() => {
            get_all_tasks();
        }, [])
    
    
        async function get_all_tasks() {
            await task_store.get_all_tasks();
    
            task_store.setIsLoading(true)
            setTimeout(()=>{
                task_store.setIsLoading(false)
            },500);
        }


    const screenHeight = window.screen.height

    // console.log("task_store.isCreate===  ", task_store.isCreate)
    // console.log("task_store.isSearch===  ", task_store.isSearch)


       if(task_store.isLoading){
            return <Loader></Loader>
        }


    return (
        <div className={styles.main}>
 
            <Task_list
            task_list={task_store.allTasks}
            ></Task_list>

            {
                task_store.isCreate && !task_store.isSearch ?
                <CreateTask_form
                
                ></CreateTask_form>
                    :
                    <></>
            }


        </div>
    )
}

export default observer(TASKS_PAGE)