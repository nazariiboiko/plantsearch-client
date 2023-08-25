export const list = () => {
    return [change_v2, change_v1];
}

export const getUpdateNumber = () => {
    return list().length;
}

export const change_v1 = () => {
    return {
        version: 'V_0.0.1', time: '22/08/2023',
        new_feature: ['Створено нову сторінку ChangeLog (видно лише адміну)',
            'Створена перевірка при реєстрації',
            'Логін тепер має бути довшим ніж 4 символа',
            'Пароль тепер перевіряється на слабкість',
            'Користувач має повторити пароль при реєстрації',
            'Добавлена функція перегляду пароля при реєстрації',
            'Добавлена reCAPTCHA при реєстрації',],
        update: ['Розсадники тепер можна створити та видалити',
            'Оновлено систему додавання до категорії Улюблено',
            'Оновлено керування Користувачами'],

        fixed: ['Розсаду знову можна редагувати натиснувши на кнопку "Детальніше"'],
        deleted: ['Кнопка Профіль видалена', 'Функція забув пароль видалена']
    };
};

export const change_v2 = () => {
    return {
        version: 'V_0.0.2', time: '25/08/2023',
        new_feature: ['Добавлений refresh token',],
        update: ['Змінена система Додавання/Редугавання розсад',
        'Змінена головна сторінка',
        'Змінена сторінка Улюблене',
        'Змінена сторінка Розсадники',
        'Якщо у розсади немає зображення буде відображатись no_image.png',
        'Оновлено перегляд користувача'],
        fixed: ['У панелі керування розсадниками знову можна переглянути добавлену розсаду.',
        'Фільтр знову відображає результат'],

    }
}


  //new_feature
  //update
  //deleted
  //fixed