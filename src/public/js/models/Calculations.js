export default class Calculations {
  constructor() {
    this.flights = [];
    this.hotels = [];
    this.cars = [];
    this.food = [];
    this.others = [];
  }

  addFlightItem(data) {
    let carriersStr = '';
    data.carriersDetails.forEach((el) => (carriersStr += el.name + ', '));
    let carriers = carriersStr.slice(0, -2);

    const flight = {
      id: data.id,
      origin: data.originCity,
      name: data.name,
      destination: data.destinationCity,
      depDate: data.departureTime.toDateString(),
      depHours: data.departureTime.getHours(),
      depMinutes: data.departureTime.getMinutes() < 10 ? '0' : '' + data.departureTime.getMinutes(),
      arrivalDate: data.arrivalTime.toDateString(),
      arrivalHours: data.arrivalTime.getHours(),
      arrivalMinutes: data.arrivalTime.getMinutes() < 10 ? '0' : '' + data.arrivalTime.getMinutes(),
      stops: data.stops,
      carriers: carriers,
      img: data.carriersDetails[0].img,
      duration: Math.floor(data.duration / 3600) + 'h ' + (data.duration - Math.floor(data.duration / 3600) * 3600) / 60,
      adults: data.adults,
      children: data.children,
      infants: data.infants,
      price: data.price,
      note: '',
    };

    this.flights.push(flight);

    // Persist data in localStorage
    this.persistData();

    return flight;
  }

  deleteFlightItem(id) {
    const index = this.flights.findIndex((el) => el.id === id);
    this.flights.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  addHotelItem(data) {
    const hotel = {
      id: data.id.toString(),
      name: data.name,
      img: data.img,
      stars: data.stars,
      rating: data.rating,
      scale: data.scale,
      pricePerNight: data.pricePerNight,
      price: data.price,
      neighbourhood: data.neighbourhood,
      city: data.city,
      address: data.address,
      checkin: data.checkin,
      checkout: data.checkout,
      nights: data.nights,
      adults: data.adults,
      children: data.children,
      note: '',
    };

    this.hotels.push(hotel);

    // Persist data in localStorage
    this.persistData();
    return hotel;
  }

  deleteHotelItem(id) {
    const index = this.hotels.findIndex((el) => el.id === id);
    this.hotels.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  addOtherItem(data) {
    const otherExpense = {
      id: data.id.toString(),
      expense: data.expense,
      price: data.price,
      note: '',
    };

    this.others.push(otherExpense);

    // Persist data in localStorage
    this.persistData();
    return otherExpense;
  }

  deleteOtherItem(id) {
    const index = this.others.findIndex((el) => el.id === id);
    this.others.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  addFoodItem(data) {
    const foodSpending = {
      id: data.id.toString(),
      days: data.days,
      price: data.price,
      priceLevel: data.priceLevel,
      priceLevelMsg: data.priceLevelMsg,
      travelStyle: data.travelStyle,
      note: '',
    };

    this.food.push(foodSpending);

    // Persist data in localStorage
    this.persistData();
    return foodSpending;
  }

  deleteFoodItem(id) {
    const index = this.food.findIndex((el) => el.id === id);
    this.food.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  addCarItem(data) {
    const carRentalCost = {
      id: data.id.toString(),
      price: data.price,
      company: data.company,
      note: '',
    };

    this.cars.push(carRentalCost);
    // Persist data in localStorage
    this.persistData();
    return carRentalCost;
  }

  deleteCarItem(id) {
    const index = this.cars.findIndex((el) => el.id === id);
    this.cars.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  persistData() {
    localStorage.setItem('flights', JSON.stringify(this.flights));
    localStorage.setItem('hotels', JSON.stringify(this.hotels));
    localStorage.setItem('cars', JSON.stringify(this.cars));
    localStorage.setItem('food', JSON.stringify(this.food));
    localStorage.setItem('others', JSON.stringify(this.others));
  }

  readStorage() {
    const flights = JSON.parse(localStorage.getItem('flights'));
    const hotels = JSON.parse(localStorage.getItem('hotels'));
    const cars = JSON.parse(localStorage.getItem('cars'));
    const food = JSON.parse(localStorage.getItem('food'));
    const others = JSON.parse(localStorage.getItem('others'));

    // restore data from localStorage;
    if (flights) {
      this.flights = flights;
    }
    if (hotels) {
      this.hotels = hotels;
    }
    if (cars) {
      this.cars = cars;
    }
    if (food) {
      this.food = food;
    }
    if (others) {
      this.others = others;
    }
  }
}
