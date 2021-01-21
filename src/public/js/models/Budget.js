export default class Budget {
  constructor() {
    this.expenses = [];
  }

  addExpense(id, name, price) {
    const expense = {
      id,
      name,
      price,
    };

    this.expenses.push(expense);
    // Persist data in localStorage
    this.persistData();
    return expense;
  }

  removeExpense(id) {
    const index = this.expenses.findIndex((el) => el.id === id);
    this.expenses.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  calculateBudget() {
    this.budget = 0;
    this.expenses.forEach((e) => (this.budget += e.price));

    // Persist data in localStorage
    this.persistData();
  }

  persistData() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    localStorage.setItem('budget', JSON.stringify(this.budget));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('expenses'));
    const budget = JSON.parse(localStorage.getItem('budget'));

    // restore data from localStorage;
    if (storage) {
      this.expenses = storage;
      this.budget = budget;
    }
  }
}
