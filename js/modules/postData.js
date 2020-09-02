const postData = async (url, data) => { // внутри будет асинхронный код
    const res = await fetch(url, { // дожидаемся результат запроса
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json(); // дожидаемся метода json, только после этого возвращаем значение функции. Возвращается обычный объект
}

export default postData;