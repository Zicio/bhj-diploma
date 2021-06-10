/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = 'http://localhost:8000/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    createRequest({
      url: this.URL,
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}
