import axios from 'axios';

export default class Flights {
  constructor(query) {
    this.query = query;
  }

  async searchTheSky() {
    try {
      const res = await axios({
        method: 'POST',
        url: '/request-flights',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: this.query,
      });

      this.result = res;
      this.itineraries = res.data.data;
      this.qr = res.data.search_params;
    } catch (error) {
      console.log(error);
      alert('We could not get the results. Please try again in few minutes');
    }
  }

  getDetails() {
    this.flightsArr = this.itineraries.map((el) => new Itinerary(el));
    this.flightsArr.forEach((el) => el.getFlightDetails(this.qr));
  }
}

class Itinerary {
  constructor(data) {
    //   this.legId = data.OutboundLegId;
    this.id = data.id.replace(/_|\|/g, '');
    this.price = data.price;
    // this.deepLink = data.PricingOptions[0].DeeplinkUrl;
    // this.bookingLink = data.BookingDetailsLink.Uri;
    this.bookingToken = data.booking_token;
    this.departureTime = new Date(data.local_departure);
    this.arrivalTime = new Date(data.local_arrival);
    this.originCity = data.cityFrom;
    this.originCode = data.cityCodeFrom;
    this.destinationCity = data.cityTo;
    this.destinationCode = data.cityCodeTo;
    this.duration = data.duration.departure;
    this.stops = data.route.length - 1;
    this.carriersArr = data.airlines;
  }

  getFlightDetails(qr) {
    // this.originId = details.OriginStation;
    // this.destinationId = details.DestinationStation;
    //  this.departureTime = new Date(details.Departure);
    //  this.arrivalTime = new Date(details.Arrival);
    // this.duration = details.Duration;

    //this.carriersArr = details.Carriers;

    // this.originCity = places[places.findIndex((el) => el.Id === this.originId)].Name;
    // this.originCode = places[places.findIndex((el) => el.Id === this.originId)].Code;
    // this.destinationCity = places[places.findIndex((el) => el.Id === this.destinationId)].Name;
    // this.destinationCode = places[places.findIndex((el) => el.Id === this.destinationId)].Code;
    this.name = this.originCode + ' &rarr; ' + this.destinationCode;

    this.carriersDetails = this.carriersArr.map((el) => new Carrier(el));
    // this.carriersDetails.forEach((el) => el.getCarrierDetails());

    this.adults = qr.seats.adults;
    this.children = qr.seats.children;
    this.infants = qr.seats.infants;
  }
}

class Carrier {
  constructor(el) {
    this.code = el;
    // this.img = carriers[carriers.findIndex((el) => el.Id === car)].ImageUrl;
    this.img = `https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${this.code}`;
    this.name = this.code;
    // this.name = carriers[carriers.findIndex((el) => el.Id === car)].Name;
  }

  async getCarrierDetails() {
    try {
      const res = await axios({
        method: 'POST',
        url: '/get-carrier-details',
        data: { code: this.code },
      });

      this.result = res;
    } catch (error) {
      console.log(error);
    }
  }
}
