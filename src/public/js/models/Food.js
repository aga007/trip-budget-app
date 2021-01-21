const qs = require('querystring');

export default class Food {
  constructor(query) {
    this.id = Date.now();
    this.query = query;
  }

  //tripStart=2020-05-31&tripEnd=2020-06-03&travelStyle=mid&priceLevel=5&dailySpending=12&dailySpendingType=perPerson&foodNrOfPeople=3
  getFoodSpendingDetails() {
    let qr = qs.parse(this.query);
    this.tripStart = new Date(qr.tripStart);
    this.tripEnd = new Date(qr.tripEnd);
    this.travelStyle = qr.travelStyle;
    this.priceLevel = qr.priceLevel;
    this.dailySpending = qr.dailySpending;
    this.dailySpendingType = qr.dailySpendingType;
    this.foodNrOfPeople = qr.foodNrOfPeople;
    this.averageDailySpending = this.dailySpendingType == 'perPerson' ? Number(this.dailySpending) * Number(this.foodNrOfPeople) : Number(this.dailySpending);
    let timeDif = this.tripEnd.getTime() - this.tripStart.getTime();
    this.nights = timeDif / (1000 * 3600 * 24);
    this.days = this.nights + 1;

    let travelStyleRate;

    switch (this.travelStyle) {
      case 'budget':
        travelStyleRate = 1.1;
        break;
      case 'mid-range':
        travelStyleRate = 1.2;
        break;
      case 'luxury':
        travelStyleRate = 1.5;
        break;
      default:
        travelStyleRate = 1;
    }

    let priceLevelRate;
    switch (this.priceLevel) {
      case '1':
        priceLevelRate = 0.5;
        this.priceLevelMsg = 'much cheaper than';
        break;
      case '2':
        priceLevelRate = 0.8;
        this.priceLevelMsg = 'a little cheaper than';
        break;
      case '4':
        priceLevelRate = 1.2;
        this.priceLevelMsg = 'a little more expensive than';
        break;
      case '5':
        priceLevelRate = 1.5;
        this.priceLevelMsg = 'much more expensive than';
        break;
      default:
        priceLevelRate = 1;
        this.priceLevelMsg = 'as expensive as';
    }

    this.price = Number((this.averageDailySpending * travelStyleRate * priceLevelRate * this.days).toFixed(2));
  }
}
