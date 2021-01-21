import { elements, elementStrings, displayDate } from './base';
import { renderButtons } from './searchView';

export const getHotelInput = () =>
  `destination=${document.getElementById('destinationCity').value}&checkin=${document.getElementById('tripStart').value}&checkout=${document.getElementById('tripEnd').value}&adults=${
    document.getElementById('adults').value
  }&children=${document.getElementById('children').value}&rooms=${document.getElementById('rooms').value}&max=${document.getElementById('max').value}`;

export const renderHotelSearchForm = (date) => {
  const markup = ` <form class="form" id="${elementStrings.hotelSearch}">
                      <div class="form__group">
                      <label class="form__label" for="destination" >City: </label>
                      <input class="form__input"  type="search" id="destination" placeholder="Where are you going?" >
                      </div>
                      <div class="form__group">
                      <label class="form__label" for="destinationCity" >List: </label>
                      <select class="form__input" id="destinationCity" name="destinationCity" required>
                      </select>
                      </div>
                      <div class="form__group">
                      <label class="form__label" for="tripStart" >Check-in:</label>
                      <input class="form__input" type="date" min="${date}" id="tripStart" name="checkinDate" placeholder="Check-in" required>
                      </div>
                      <div class="form__group">
                      <label class="form__label" for="tripEnd" >Check-out:</label>
                      <input class="form__input" type="date" min="${date}" id="tripEnd" name="checkoutDate" placeholder="Check-out" required>
                      </div>
                      <div class="form__group">
                      <label class="form__label" for="adults" >Adults:</label>
                      <select class="form__input" name="adults" id="adults"  required>
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                      </select>
                      </div>
                     
                      <div class="form__group">
                      <label class="form__label" for="children" >Kids age: </label>
                      <input class="form__input" type="text" id="children" name="children-age" placeholder="Separated by comma" >
                      </div>
                     
                      <div class="form__group">
                      <label class="form__label" for="rooms">Rooms:</label>
                      <select class="form__input" name="rooms" id="rooms">
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                      </div>    
                      <div class="form__group">
                      <input type="hidden" id="max" name="max" min="20" max="7000" value="5000" step="1">
                      </div>

                      <div class="form__button">
                      <button class="btn btn__big">Search hotels</button>
                      </div>
                      </form>`;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};

const renderCheckInDetails = (checkin, checkout, nights, adults, children) => {
  const markup = `
    <div class="search__query-details">
      <h4 class="heading-quaternary u-margin-bottom-small">From: ${displayDate(checkin)} <br>To: ${displayDate(checkout)}</h4>
      <p class="paragraph">Adults: ${adults} Children: ${children} Nights: ${nights} </p>
    </div>
    `;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};

const renderHotel = (hotel) => {
  const markup = `<div class="result">
    <div class="result__carrier">
      <img class="result__img" src="${hotel.img}" alt="${hotel.name}">
    </div>
    <div class="result__price">
      ${hotel.price}€
    </div>
    <div class="result__details">
      <div class="result__full">
        <span class="result__title">${hotel.name}</span> 
        Hotel ${hotel.stars} stars
      </div>
      <div class="result__info ">
        <span class="result__text"><i class="fa fa-star result__icon" aria-hidden="true"></i> ${hotel.rating} / ${hotel.scale}</span> 
        <span class="result__text">${hotel.city}, ${hotel.neighbourhood}</span> 
      </div>

    </div>

    <a href="#" data-getid="${hotel.id}" class="btn btn__small btn--red result__button add-hotel-details">Add to expenses</a>
    <a href="https://www.tripadvisor.com/Hotels" target="_blank" class="btn btn__small result__button ">More details</a>

    </div>`;

  elements.reqBox.insertAdjacentHTML('beforeend', markup);
};

export const renderHotels = (hotels, page = 1, resPerPage = 5) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  const hotelsArr = hotels.hotelsArr;
  renderCheckInDetails(hotels.checkin, hotels.checkout, hotels.nights, hotels.adults, hotels.children);
  hotelsArr.slice(start, end).forEach(renderHotel);

  // render the pagination buttons
  renderButtons(page, hotelsArr.length, resPerPage, 'hotels-pagination');
};
