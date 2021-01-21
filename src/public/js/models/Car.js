const qs = require('querystring');

export default class Car {
  constructor(query) {
    this.id = Date.now();
    this.query = query;
  }

  getCarRentalDetails() {
    let qr = qs.parse(this.query);
    this.price = Number(qr.carRentalCost);
    this.company = qr.carRentalCompany;
  }
}
