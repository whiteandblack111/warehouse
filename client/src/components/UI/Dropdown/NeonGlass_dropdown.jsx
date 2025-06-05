import { useContext } from 'react';

import { observer } from "mobx-react-lite"
import styles from './neonGlass_dropdown.module.css'
import { Context } from "../../../index";

import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NeonGlass_dropdown = (props) => {


    const { user_store } = useContext(Context);

    return (
        <Form.Group className={`${'mb-3'} ${styles.wrapperInput} ${styles.btnBox}`} >
            <DropdownButton

                onSelect={(eventKey) => props.onSelect(eventKey)}

                className={styles.btn_glass}
                id="dropdown-basic-button"
                title={props.title}
            >
                <Dropdown.Item
                    eventKey={"new"}
                    className={styles.selectItem}
                >{"Новый"}
                </Dropdown.Item>
                {props.selectsData
                    ?
                    props.selectsData.map((select) => {
                        return <Dropdown.Item
                            eventKey={select[`${props.selectId}`]}
                            key={select[`${props.selectId}`]}
                            className={styles.selectItem}
                        >{select[`${props.selectName}`]}
                        </Dropdown.Item>
                    })

                    :
                    <></>

                }

            </DropdownButton>
        </Form.Group>
    )
}

export default observer(NeonGlass_dropdown);