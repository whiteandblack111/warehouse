import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../../index';

import styles from './admin_task_list_page.module.css'

import *  as  XLSX from "xlsx";
import CreateTask_form from '../../../../components/CreateTask_form/CreateTask_form';
import Task_list from '../../../../components/Task_list/Task_list';

const ADMIN_TASK_LIST_PAGE = () => {

    const [task_name, setTask_name] = useState(null)
    const [tovars_for_task, setTovars_from_task] = useState([])

    useEffect(() => {
        if (tovars_for_task.length !== 0) {
            console.log("tovars_for_task====>", tovars_for_task);
        }

    }, [tovars_for_task])

    const taskList = [
        {
            barcode: "2041780466219",
            cartons_required: "6",
            name: "Электрическая мясорубка",
            warehouse_ID: "meatgrinder"
        },
        {
            barcode: "2040989560629",
            cartons_required: "12",
            name: "Мобиль музыкальный для новорожденных 0+",
            warehouse_ID:"25902",
        }

    ]




    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        let mutateTovar = jsonData.map((tovar) => {
            let newTovar = {
                warehouse_ID: tovar["артикул"],
                barcode: tovar["штрихкод"],
                name: tovar["имя (необязательно)"],
                cartons_required: tovar["количество"],
            }
            return newTovar
        })
        setTovars_from_task(mutateTovar)
    }





    return (
        <div className={styles.main}>

            <CreateTask_form></CreateTask_form>
            <Task_list task_list={taskList}></Task_list>

        </div>
    )
}

export default observer(ADMIN_TASK_LIST_PAGE)