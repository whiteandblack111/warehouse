

// проверка ввода и затирание всего кроме цифр
export const checkInput_for_allowNumbers = (event) => {

    // если не цифра
    if (event.target.value.match(/[^0-9]/g)) {
        // записываю пустое значение
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

}

