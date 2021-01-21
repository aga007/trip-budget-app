export const elements = {
  reqBox: document.querySelector('.request__box'),
  steps: document.querySelector('.steps'),
  handle: document.querySelector('.steps__handle'),
  sidebar: document.querySelector('.steps__details'),
  icon: document.querySelector('.steps__icon'),
  logo: document.querySelector('.search__logo'),
  searchBox: document.querySelector('.search__box'),
  searchTitle: document.getElementById('search-title'),
  paginationBox: document.querySelector('.search__pagination-box'),
  calcContainer: document.querySelector('.calculations__container'),
  budget: document.querySelector('.budget'),
  budgetAmount: document.querySelector('.budget__amount'),
  budgetList: document.querySelector('.list'),
  notification: document.querySelector('.notification'),
};

// For the elements that are not yet on the page
export const elementStrings = {
  loader: 'loader',
  btnFlight: 'search-flight',
  btnHotel: 'search-hotel',
  btnCar: 'search-car',
  btnFood: 'add-food',
  btnOther: 'add-other-expense',
  flightSearch: 'flight-search',
  hotelSearch: 'hotel-search',
  otherSearch: 'other-search',
  carSearch: 'car-search',
  foodSearch: 'food-search',
  smallLogo: 'search__logo--small',
  redWhiteBtn: 'btn--red-white',
  btnAddFlightDetails: 'add-flight-details',
  btnAddHotelDetails: 'add-hotel-details',
  calcList: 'calculations__list',
  headingFlights: 'heading-flights',
  flightsList: 'flights-list',
  carsList: 'cars-list',
  hotelsList: 'hotels-list',
  othersList: 'others-list',
  foodList: 'food-list',
  calcItemTitle: 'calculations__item-title',
  itemFlights: 'item-flights',
  itemHotels: 'item-accomodation',
  itemOthers: 'item-others',
  itemFood: 'item-food',
  itemCars: 'item-cars',
  calcContainer: 'calculations__container',
  addNoteBtn: 'btn-add-note',
  xFlight: 'xdelete-flight',
  xHotel: 'xdelete-hotel',
  xOther: 'xdelete-other',
  xFood: 'xdelete-food',
  xCar: 'xdelete-car',
  xsdelete: 'calculations__delete--small',
  steps: 'show-steps',
  perPerson: 'expense-per-person',
  budgetBtn: 'expenses-list',
  listHide: 'list__hide',
  newTripBtn: 'new-trip',
};

// Test if all the arays in the object are empty.
export const isEmpty = (obj) => Object.values(obj).every((a) => a.length === 0);

// Style date
export const displayDate = (date) => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateString = `${weekDays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

  return dateString;
};

export const displayNotification = (type, txt) => {
  let text = type === 'success' ? `<i class="fas fa-check-circle notification__icon"></i>${txt}` : `<i class="fas fa-exclamation-circle notification__icon"></i>${txt}`;
  elements.notification.innerHTML = `${text}`;
  elements.notification.classList.add(`notification--${type}`);
  setTimeout(() => {
    elements.notification.classList.remove(`notification--${type}`);
    elements.notification.innerHTML = '';
  }, 4000);
};
