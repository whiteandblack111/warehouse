import {
    LOGIN_PATH,
    REGISTRATION_PATH,

    WAREHOUSE_PATH,
    TASKS_PATH,
    ORDERS_PATH,
} from "../utils/routes_constants"

import REGISTRATION_PAGE from "../pages/guests/registration/REGISTRATION_PAGE"
import LOGIN_PAGE from "../pages/guests/login/LOGIN_PAGE"


import WAREHOUSE_PAGE from "../pages/warehouse/WAREHOUSE_PAGE"
import TASKS_PAGE from "../pages/tasks/TASKS_PAGE"
import ORDERS_PAGE from "../pages/orders/ORDERS_PAGE"
import WORKERS_PAGE from "../pages/workers/WORKERS_PAGE"

export const guest_routes = [
    {
        path: REGISTRATION_PATH,
        Component: REGISTRATION_PAGE
    },
    {
        path: LOGIN_PATH,
        Component: LOGIN_PAGE
    },

]



export const auth_routes = [
    {
        path: WAREHOUSE_PATH,
        Component: WAREHOUSE_PAGE
    },
    {
        path: TASKS_PATH,
        Component: TASKS_PAGE
    },
    {
        path: ORDERS_PATH,
        Component: ORDERS_PAGE
    },

    

]