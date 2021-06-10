/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType ='json';
    if (options.method === 'GET') {
        let str = `${options.url}?`;
        for (const option in options.data) {
            str += `${option}=${options.data[option]}&`;
        }
        const url = str.slice(0, -1);
        try {
            xhr.open('GET', url);
            xhr.send();
        }
        catch (err) {
            alert(err);
        }

    }
    else {
        const formData = new FormData;
        for (const option in options.data) {
            formData.append(`${option}`, `${options.data[option]}`);
        }
        try {
            xhr.open(`${options.method}`, `${options.url}`);
            xhr.send(formData);
        }
        catch(err) {
            alert(err);
        }  
    }
    
    xhr.onload = () => {
        console.log(xhr.response);
        options.callback(null, xhr.response);
    }
    xhr.onerror = () => {
        options.callback(xhr.response.error, xhr.response);
    }
};