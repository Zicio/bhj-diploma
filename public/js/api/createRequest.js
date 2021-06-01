/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType ='json';
    if (options.method === 'GET') {
        try {
            xhr.open('GET', `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
            xhr.send();
        }
        catch (err) {
            alert(err);
        }

    }
    else if (options.method === 'POST') {
        const formData = new FormData;
        formData.append('mail', `${options.data.mail}`);
        formData.append('password', `${options.data.password}`);
        try {
            xhr.open('POST', `${options.url}`);
            xhr.send(formData);
        }
        catch(err) {
            alert(err);
        }
        
    }
    xhr.onload = () => {
        options.callback(null, response);
    }
    xhr.onerror = () => {
        options.callback(response.error, response);
    }
};
