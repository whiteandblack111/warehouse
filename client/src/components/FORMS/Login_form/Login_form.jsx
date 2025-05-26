import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './login_form.module.css'
import { Context } from '../../../index';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { TASKS_PATH } from '../../../utils/routes_constants';
import { observer } from 'mobx-react-lite';


const Login_form = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { user_store } = useContext(Context);

    const navigate = useNavigate()
    const login = async (email, password) => {

        await user_store.login(email, password);
        let roles = user_store.user.roles
        console.log(roles)

        if (user_store.isAuth) {

            await navigate(TASKS_PATH)

        }

    }

    return (
        <div>
            <Form className={styles.container}>
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} controlId="exampleForm.ControlInput1">
                    <Form.Label
                        className={styles.inputLabel}
                    >Email address</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="email"
                        type="email"
                        placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Group>
                <Form.Group className={`${'mb-3'} ${styles.wrapperInput}`} controlId="exampleForm.ControlInput2">
                    <Form.Label
                        className={styles.inputLabel}
                    >Your password</Form.Label>
                    <Form.Control
                        className={styles.input}
                        key="password"
                        type="password"
                        placeholder="Не менее 6 символов"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    {/* <Button
                        onClick={() => user_store.registration(email, password)}
                        variant="outline-success">Регистрация
                    </Button> */}
                    <Button
                        className={styles.autx_btn}
                        onClick={() => login(email, password)}
                        variant="outline-success">Войти
                    </Button>
                </Form.Group>
            </Form>

        </div>

    );
}

export default observer(Login_form);