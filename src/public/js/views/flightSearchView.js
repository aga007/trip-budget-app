import { elements, elementStrings } from './base';
import { renderButtons } from './searchView';

export const getFlightInput = () =>
  `children=${document.getElementById('children').value}&infants=${document.getElementById('infants').value}&groupPricing=true&country=IT&currency=EUR&locale=en-GB&originPlace=${
    document.getElementById('origin').value
  }&destinationPlace=${document.getElementById('destination').value}&outboundDate=${document.getElementById('date').value}&adults=${document.getElementById('adults').value}`;

export const renderFlightSearchForm = (date) => {
  const markup = ` <form class="form" id="${elementStrings.flightSearch}">
                    <div class="form__group">
                    <label class="form__label" for="origin" >From: </label>
                    <input class="form__input" list="origin-list" type="text" id="origin" name="originPlace" placeholder="City/Country/Airport" required>
                    <datalist id="origin-list">
                    </datalist>
                    </div>
                    <div class="form__group">
                    <label class="form__label" for="destination" >To:</label>
                    <input class="form__input" list="destination-list" type="text" id="destination" name="destinationPlace" placeholder="City/Country/Airport" required>
                    <datalist id="destination-list">
                    </datalist>
                    </div>
                    <div class="form__group">
                    <label class="form__label" for="date" >Date:</label>
                    <input class="form__input" type="date" min="${date}" id="date" name="outboundDate" placeholder="Date" required>
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
                    <label class="form__label" for="children">Children:</label>
                    <select class="form__input" name="children" id="children">
                        <option value="0" selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>
                    <div class="form__group">
                    <label class="form__label" for="infants">Infants:</label>
                    <select class="form__input" name="infants" id="infants">
                        <option value="0" selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>     
                    <div class="form__button">
                    <button class="btn btn__big">Search flights</button>
                    </div>
                    </form>`;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};

const renderFlight = (flight) => {
  const markup = `<div class="result">
    <div class="result__carrier">
      <img class="result__carrier-img" src="${flight.carriersDetails[0].img}" alt="${flight.carriersDetails[0].name}">
    </div>
    <div class="result__price">
      ${flight.price}€
    </div>
    <div class="result__details">
      <div class="result__flight-from">
        <span class="result__time">${flight.departureTime.getHours()}:${flight.departureTime.getMinutes() < 10 ? '0' : ''}${flight.departureTime.getMinutes()}</span> 
        <span class="result__airport">${flight.originCode}</span> 
      </div>
      <div class="result__timing">
        <span class="result__duration">${Math.floor(flight.duration / 3600)} h ${(flight.duration - Math.floor(flight.duration / 3600) * 3600) / 60} </span> 
        <span class="result__arrow">&rarr;</span> 
        <span class="result__direct">${flight.stops === 0 ? 'Direct' : flight.stops + ' stops'}</span>
      </div>
      <div class="result__flight-to">
        <span class="result__time">${flight.arrivalTime.getHours()}:${flight.arrivalTime.getMinutes() < 10 ? '0' : ''}${flight.arrivalTime.getMinutes()}</span> 
        <span class="result__airport">${flight.destinationCode}</span> 
      </div>
    </div>

    <a href="#" data-getid="${flight.id}" class="btn btn__small btn--red result__button add-flight-details">Add to expenses</a>
    <a href="https://www.kiwi.com/" target="_blank" class="btn btn__small result__button ">More details</a>

    </div>`;

  elements.reqBox.insertAdjacentHTML('beforeend', markup);
};

export const renderFlights = (flights, page = 1, resPerPage = 5) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  flights.slice(start, end).forEach(renderFlight);

  // render the pagination buttons
  renderButtons(page, flights.length, resPerPage, 'flights-pagination');
};
