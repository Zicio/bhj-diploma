/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        const accountsList = this.element.querySelector('.accounts-select');
        while (accountsList.firstChild) {
          accountsList.firstChild.remove();
        }
        for (const account of response.data) {
          accountsList.insertAdjacentHTML('beforeend', `<option value="${account.id}">${account.name}</option>`);
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        this.element.closest('.modal').dataset.modalId === 'newIncome' ? App.getModal('newIncome').close() : App.getModal('newExpense').close();
        App.update();
      }
    });
  }
}