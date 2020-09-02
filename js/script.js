'use strict';

import menu from './modules/menu.js';
import {Card} from './modules/cards.js';
import mask from './modules/mask.js';
import postData from './modules/postData.js';

menu('.header-navbar__menu-item');
mask('[name="number"]');

// Форма

const form = document.querySelector('form');
// Проверка полей 
const inputsForm = document.querySelectorAll('.header-form__content-input');
const checkInput = (inputs) => {
    inputs.forEach(item => {
        if (item.value != '') {
            item.classList.remove('empty');
        } else {
            item.classList.add('empty');
        }
        setTimeout(function () {
            if (item.classList.contains('empty')) {
                item.classList.remove('empty');
            }
        }, 2000);
    })
};

// Считаем количество пустых полей
const emptyInputCount = (inputs) => {
    let count = 0;
    checkInput(inputsForm);
    inputs.forEach(item => {
        if (item.classList.contains('empty')) {
            count++;
        }
    });
    return count;
}

const message = {
    loading: 'Данные отправляются на сервер, подождите..',
    success: 'Ваши данные получены - дождитесь ответа.',
    failure: 'Данные до нас не дошли, пожалуйста, повторите попытку..',
    errorForm: 'Заполните все поля формы.'
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const notice = document.createElement('div'); // блок с уведомлением пользователя
    form.append(notice);

    const count = emptyInputCount(inputsForm);
    console.log('Незаполненных полей формы: ', count);
    if (count <= 0) {
        notice.textContent = message.loading;

        const dataForm = new FormData(form); // Забираем данные с формы
        const json = JSON.stringify(Object.fromEntries(dataForm.entries())); // из полученных данных получаем массив массивов. Далее переводим массив в обычный объект и переводим в JSON строку
        /*           object = {};
                  dataForm.forEach((item, i) => { // из экземляра FormData перезаписываем в json
                    object[i] = item;
                }); */

        postData('http://localhost:3000/requestForm', json)
            .then(data => {
                console.log(data);
                console.log('Запрос выполнен корректно', data);
                notice.textContent = message.success;
            }).catch((err) => { // Предыдущий промис отображаем в консоль
                console.log(err);
                notice.textContent = message.failure;
            }).finally(() => {
                form.reset();
                setTimeout(() => {
                    notice.remove();
                }, 2000);
            });
    } else {
        notice.textContent = message.errorForm;
        setTimeout(() => {
            notice.remove();
        }, 2000);
    }

});

// Валидация формы

/* const number = document.querySelector('#number'),
    user = document.querySelector('#user');
console.log(user);
console.log(number);
number.addEventListener('input', (e) => {
    console.log(e);
    if (e.data.match(/\D/)) { // Если в значении инпута не число тогда
        number.style.border = '1px solid red';
        number.value = number.value.replace(/\D/i, ''); // Если не число заменяем на '' 
    } else {
        number.style.border = 'none';
    }
});
user.addEventListener('input', (e) => {
    if (e.data.match(/[0-9_+=-]/gm)) {
        user.style.border = '1px solid red';
        user.value = user.value.replace(/[0-9_+=-]/gm, '');
    } else {
        user.style.border = 'none';
    }
}); */

// Карточки товаров

const getCard = async (url) => {
    const res = await fetch(url);

    if (!res.ok) { // свойство ok возвращает либо true, либо false после обработки fetch запроса 
        throw new Error(`Fetch не обработал запрос ${url}. Статус: ${res.status}`);
    }

    return await res.json(); // Возвращаем полученный объект
}

getCard('http://localhost:3000/cardList')
    .then(cardList => {
        cardList.forEach((card) => {
            new Card(
                card.title,
                card.imgSpeed,
                card.altImgSpeed,
                card.speed,
                card.imgChanel,
                card.altImgChanel,
                card.chanel,
                card.price,
                card.parentSelector
            ).render();
        });
    });