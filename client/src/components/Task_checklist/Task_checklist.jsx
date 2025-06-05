import { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite"
import styles from './task_checklist.module.css';
import Box_for_task from "./../Box_for_task/Box_for_task";
import { Context } from "../../index";
import { action } from 'mobx';




const Task_checklist = (props) => {
    const { boxTask_store } = useContext(Context);
    const [boxes_for_task, setBoxes_for_task] = useState([])


    useEffect(() => {
        getAllBoxes_for_currentTask()
    }, [])

    useEffect(() => {
        getAllBoxes_for_currentTask()
    }, [boxTask_store.isChahge])

    


    const getAllBoxes_for_currentTask = async () => {
        // ЧИСТО ДЛЯ ТЕСТОВ
        const boxes = await boxTask_store.getAllBoxes_for_currentTask(props.task.id);
      

        setBoxes_for_task(boxes)
        if (boxTask_store.boxes_for_task) {
            // console.log("Task_id ===> ", props.task.id)
            // console.log("Task_checklist boxes_for_task111 ===> ", boxTask_store.boxes_for_task)

        }

    }


    return (
        <div className={styles.checklist}>
            {
                boxes_for_task.map((box, index) => {

                    return (
                        <Box_for_task
                            box={box}
                            box_number={index + 1}
                        ></Box_for_task>
                    )
                })
                
            }
        </div>
    )

}

export default observer(Task_checklist);