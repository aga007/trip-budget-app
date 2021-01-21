import axios from 'axios';
const qs = require('querystring');

export default class Hotels {
  constructor(query) {
    this.query = query;
  }

  async searchHotels() {
    try {
      const res = await axios({
        method: 'POST',
        url: '/request-hotels',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: this.query,
      });

      this.result = res.data;
      this.qr = qs.parse(this.query);
      let partsCheckin = this.qr.checkin.split('-');
      let partsCheckout = this.qr.checkout.split('-');
      this.checkin = new Date(partsCheckin[0], partsCheckin[1] - 1, partsCheckin[2]);
      this.checkout = new Date(partsCheckout[0], partsCheckout[1] - 1, partsCheckout[2]);
      let timeDif = this.checkout.getTime() - this.checkin.getTime();
      this.nights = timeDif / (1000 * 3600 * 24);
      this.adults = this.qr.adults;
      this.children = this.qr.children.length > 0 ? this.qr.children.split(',').length : 0;

      this.hotelsList = res.data.data.body.searchResults.results;
    } catch (error) {
      console.log(error);
      alert('We could not get the results. Please try again in few minutes');
    }
  }

  getDetails() {
    this.hotelsArr = this.hotelsList.map((el) => new Hotel(el.id));
    this.hotelsArr.forEach((el) => el.getHotelDetails(this.hotelsList, this.nights));
  }
}

class Hotel {
  constructor(id) {
    this.id = id;
  }

  getHotelDetails(hotelsList, nights) {
    const hotel = hotelsList[hotelsList.findIndex((el) => el.id === this.id)];
    // let totalCost = hotel.ratePlan.price.totalPricePerStay;
    // let pricePerStay = parseFloat(totalCost.substring(totalCost.indexOf('>') + 1, totalCost.indexOf('€')));

    this.name = hotel.name;
    this.img = hotel.thumbnailUrl;
    this.stars = hotel.starRating;
    this.rating = hotel.guestReviews ? hotel.guestReviews.rating : '-';
    this.scale = hotel.guestReviews ? hotel.guestReviews.scale : '-';
    this.pricePerNight = hotel.ratePlan.price.current;
    this.price = parseFloat(this.pricePerNight) * nights;
    this.neighbourhood = hotel.neighbourhood;
    this.city = hotel.address.locality;
    this.address = `${hotel.address.streetAddress}, ${hotel.address.postalCode}, ${hotel.address.locality}, ${hotel.address.countryName}`;
  }
}
