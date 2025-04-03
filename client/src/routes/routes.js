import { 
    ADMIN_WAREHOUSE_PATH, 
    ADMIN_TASK_LIST_PATH, 
    ADMIN_TASK_ONE_PATH, 
    LOGIN_PATH,
    REGISTRATION_PATH,
    WORKER_TASK_LIST_PATH,
    WORKER_TASK_ONE_PATH
} from "../utils/routes_constants"

import REGISTRATION_PAGE from "../pages/guests/registration/REGISTRATION_PAGE"
import LOGIN_PAGE from "../pages/guests/login/LOGIN_PAGE"

import { WORKER_TASK_LIST_PAGE } from "../pages/workers/task_list/WORKER_TASK_LIST_PAGE"
import { WORKER_TASK_ONE_PAGE } from "../pages/workers/task_one/WORKER_TASK_ONE_PAGE"


import ADMIN_WAREHOUSE_PAGE from "../pages/admins/warehouse/ADMIN_WAREHOUSE_PAGE"
import ADMIN_TASK_LIST_PAGE from "../pages/admins/tasks/task_list/ADMIN_TASK_LIST_PAGE"
import {ADMIN_TASK_ONE} from "../pages/admins/tasks/task_one/ADMIN_TASK_ONE"

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

export const worker_routes = [
    {
        path: WORKER_TASK_LIST_PATH,
        Component: WORKER_TASK_LIST_PAGE
    },
    {
        path: WORKER_TASK_ONE_PATH,
        Component: WORKER_TASK_ONE_PAGE
    },
    
]

export const admin_routes = [
    {
        path: ADMIN_WAREHOUSE_PATH,
        Component: ADMIN_WAREHOUSE_PAGE
    },
    {
        path: ADMIN_TASK_LIST_PATH,
        Component: ADMIN_TASK_LIST_PAGE
    },
    
    {
        path: ADMIN_TASK_ONE_PATH + '/:id',
        Component: ADMIN_TASK_ONE
    },

]