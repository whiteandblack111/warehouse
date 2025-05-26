import React, { useContext, useState, useEffect, useRef } from 'react';
import styles_desctop from './task_one_desctop.module.css';
import styles_mobile from './task_one_mobile.module.css';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Update_executor_popup from '../POPUPs/Update_executor/Update_executor_popup';
import Tovar_task from '../Tovar_task/Tovar_task';
import Snake_border_btn from '../UI/BUTTONS/Snake_border_btn/Snake_border_btn';
import ROLE_VERIFICATION from '../PAGE_COMPONENTS/ROLE_VERIFICATION/ROLE_VERIFICATION';




const Task_one = ({ task }) => {
    const [styles, setStyles] = useState("")
    const [executor, setExecutor] = useState("")
    const [isOpen_update_executor_popup, setIsOpen_update_executor_popup] = useState(false)



    const { sticker_store } = useContext(Context);
    const { task_store } = useContext(Context);
    const { tovar_forTask_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const { interface_store } = useContext(Context);


    const executor_ref = useRef(null);
    const executor_popup_ref = useRef(null);


    useEffect(() => {
        setExecutor(task.executor)

        setStyles(styles_desctop)

        if (interface_store.isMobile) {
            setStyles(styles_mobile)
        }

    }, [interface_store.isMobile])



    const handler_hover_executorStatus = (e) => {
        const executor_field = executor_ref.current;
        // setExecutor("назначить")

        executor_field.classList.add('headingItem_value_hover');
    }

    const handler_leave_executorStatus = (e) => {
        const executor_field = executor_ref.current;
        setExecutor(task.executor)
        executor_field.classList.remove('headingItem_value_hover');
    }

    const update_executor_popup_open = async (e) => {
        await user_store.get_all_workers();

        setIsOpen_update_executor_popup(true)
    }




    return (

        <div className={styles.container}>


            <div className={styles.task_name_container}>

                <div className={`${styles.headingItem} ${styles.task_name}`}>
                    Название поставки
                </div>
                <div className={`${styles.headingItem_value} ${styles.task_name_value}`}>
                    {task.task_name}
                </div>
            </div>

            <div className={styles.heading}
            >
                <div className={`${styles.headingItem} ${styles.task_id_head}`}>№</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.shop_name}`}>Магазин</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.author_build}`}>Автор сборки</div>
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.task_time}`}>Дата сборки</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.executor_head}`}>Сборщик</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.statusWork}`}>Статус готовности</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem} ${styles.quantity_head}`}>Кол-во позиций</div>
            </div>


            <div className={styles.heading}>
                <div className={`${styles.headingItem_value} ${styles.task_id_value}`}>{task.id}</div>
                <div className={styles.line} ></div>

                <div className={`${styles.headingItem_value} ${styles.shop_name}`}>{task.shop_name}</div>
                <div className={styles.line}></div>

                {task.userId && task.user && task.user.firstname
                    ?
                    <div className={`${styles.headingItem_value} ${styles.author_warning} .no-select`}>{task.user.firstname}</div>
                    :
                    <div className={`${styles.headingItem_value} ${styles.author_warning} .no-select`}>{"не определён"}</div>
                }
                <div className={styles.line}></div>

                <div className={`${styles.headingItem} ${styles.task_time_value}`}>
                    {task.start_build}
                    <div className={styles.line}></div>
                    {task.end_build}
                </div>
                <div className={styles.line} ></div>



                {user_store.isAdmin ?
                    <div
                        onMouseEnter={(e) => { handler_hover_executorStatus(e) }}
                        onMouseLeave={(e) => { handler_leave_executorStatus(e) }}
                        onClick={(e) => { update_executor_popup_open() }}
                        ref={executor_ref}
                        className={executor === "не назначен" || executor === "назначить"
                            ? `${styles.headingItem_value} ${styles.executor_warning_text}  `
                            : `${styles.headingItem_value} ${styles.executor_value}`
                        }

                    // className={
                    //     `${styles.headingItem_value} ${styles.executor_value}`
                    // }
                    >
                        {executor}


                        <Update_executor_popup

                            ref={executor_popup_ref}
                            task_id={task.id}
                            isOpen_update_executor_popup={isOpen_update_executor_popup}
                            setIsOpen_update_executor_popup={setIsOpen_update_executor_popup}

                        ></Update_executor_popup>
                    </div>
                    :
                    <div
                        className={executor === "не назначен"
                            ? `${styles.headingItem_value} ${styles.executor_warning_text}`
                            : `${styles.headingItem_value} ${styles.executor_value}`
                        }
                    >
                        {executor}


                        <Update_executor_popup
                            ref={executor_popup_ref}
                            task_id={task.id}
                            isOpen_update_executor_popup={isOpen_update_executor_popup}
                            setIsOpen_update_executor_popup={setIsOpen_update_executor_popup}

                        ></Update_executor_popup>
                    </div>
                }




                <div className={styles.line} ></div>

                {
                    task.statusWork === "в очереди" ?
                        <div className={`${styles.headingItem_value} ${styles.statusWork_warning}`}>{task.statusWork}</div>
                        :
                        <div className={`${styles.headingItem_value} ${styles.statusWork}`}>{task.statusWork}</div>
                }

                <div className={styles.line} ></div>

                <div className={`${styles.headingItem_value} ${styles.quantity}`}>
                    {task.tovar_for_tasks.length
                        ?
                        task.tovar_for_tasks.length
                        :
                        0
                    }
                </div>
            </div>

            <div className={styles.container_tasks}>

                {
                    task.tovar_for_tasks.map((tovar_task, index) => { 
                       

                        return (<Tovar_task

                            key={tovar_task.id}
                            tovar_task={tovar_task}
                            index={index}
                        ></Tovar_task>
                        )
                    })

                }

            </div>
        </div>
    )
}

export default observer(Task_one)