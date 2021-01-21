const qs = require('querystring');

export default class Other {
  constructor(query) {
    this.id = Date.now();
    this.query = query;
  }

  getOtherExpenseDetails() {
    let qr = qs.parse(this.query);
    this.expense = qr.otherExpense;
    this.cost = qr.otherExpenseCost;
    this.costType = qr.otherExpenseType;
    this.nrOfPeople = qr.otherExpensePeople;
    this.price = this.costType == 'perPerson' ? Number(this.cost) * Number(this.nrOfPeople) : Number(this.cost);
  }

}
