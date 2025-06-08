export const statuses_tovar_for_task = {
    default: {
        value: "default",
        message: "Дефолтное значение"
    },
    must_be_deleted: {
        value: "must_be_deleted",
        message: "Необходимо удалить эту позицию из списка поставки"
    },

    tovar_successfully_removed_from_delivery_list: {
        value: "tovar_successfully_removed_from_delivery_list",
        message: "Позиция успешно удалёна из списка поставки"
    },

    quantity_has_been_changed: {
        value: "quantity_has_been_changed",
        message: "Количество для сборки было изменено"
    },

    tovar_is_packed: {
        value: "tovar_is_packed",
        message: "Позиция упакована"
    },

    tovar_packaging_is_suspended: {
        value: "tovar_packaging_is_suspended",
        message: "Упаковка позиции приостановлена"
    },

    the_tovar_in_process_of_packaging: {
        value: "the_tovar_in_process_of_packaging",
        message: "Позиция в процессе упаковки"
    },


    this_tovar_added_for_delivery: {
        value: "this_tovar_added_for_delivery",
        message: "Это новая позиция добавленая в поставку для сборки, в начальном списке её не было"
    },

    this_tovar_added_for_delivery_AND_must_be_deleted: {
        value: "this_tovar_added_for_delivery_AND_must_be_deleted",
        message: "Это новая позиция добавленая в поставку для сборки. Но принято решение её удалить. Перед удаление рекомендуется проверить, возможно позиция в процессе сборки."
    },

    this_tovar_task_container_done_AND_must_be_deleted: {
        value: "this_tovar_task_container_done_AND_must_be_deleted",
        message: "Эта позиция была упакована, НО назначена на удаление из списка, необходимо распаковать и вернуть на склад"
    },

    this_tovar_added_for_delivery_AND_tovar_is_packed: {
        value: "this_tovar_task_container_done_AND_must_be_deleted",
        message: "Эта позиция была добавлена в поставку для сборки, в данный момент она упакована"
    }

}