import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite"
import styles from './update_executor_popup.module.css'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Fiolet_border_btn from "../../UI/BUTTONS/Fiolet_border_btn/Fiolet_border_btn";
import { Context } from '../../../index';

const Update_executor_popup = ({ isOpen_update_executor_popup, setIsOpen_update_executor_popup, ref, task_id }) => {

    const [executor_name, setExecutor_name] = useState('Выбрать:');
    const [workerId, setWorkerId] = useState('');

    const { user_store } = useContext(Context);
    const { task_store } = useContext(Context);


    useEffect(() => {
        window.addEventListener("keydown", handler_keyUp_form);

        user_store.get_all_workers();
        return () => {
            window.removeEventListener("keydown", handler_keyUp_form);
        };


    }, []);

    const handler_keyUp_form = async (e) => {
        if (e.keyCode === 27) {
            setIsOpen_update_executor_popup(false)
            console.log('Close')
        }
    }


    const handleSelect = (evt) => {
        user_store.allWorkers.map((worker) => {
            if (worker.id == evt) {
                setExecutor_name(worker.firstname);
                setWorkerId(worker.id)
            }
        })
    }

    const update_executor = async () => {
       await task_store.set_executor(task_id, workerId)
    }

    return (
        <div
            className={
                isOpen_update_executor_popup
                    ?
                    styles.main_block
                    :
                    styles.popup_close
            }
            ref={ref}
            onMouseLeave={() => { setIsOpen_update_executor_popup(false) }}
        >
            <DropdownButton

                onSelect={(eventKey) => handleSelect(eventKey)}

                className={`btn_glass ${styles.dropdown_btn} `}
                id="dropdown-basic-button"
                title={executor_name}
            >
                {
                    user_store.allWorkers.map((worker) => {
                        return <Dropdown.Item
                            key={worker.id}
                            eventKey={worker.id}
                        >{worker.firstname}</Dropdown.Item>
                    })
                }

            </DropdownButton>


            <Fiolet_border_btn
                btn_click_callbackFunction={update_executor}
            >
                Назначить
            </Fiolet_border_btn>



        </div>
    )

}

export default observer(Update_executor_popup);