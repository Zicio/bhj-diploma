/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType ='json';
    if (options.method === 'GET') {
        try {
            xhr.open('GET', `${options.url}?${Object.keys(options.data)[0]}=${Object.values(options.data)[0]}&${Object.keys(options.data)[1]}=${Object.values(options.data)[1]}`);
            xhr.send();
        }
        catch (err) {
            alert(err);
        }

    }
    else {
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
    
    const response = xhr.response;
    xhr.onload = () => {
        console.log(response);
        options.callback(null, response);
    }
    xhr.onerror = () => {
        options.callback(response.error, response);
    }
};