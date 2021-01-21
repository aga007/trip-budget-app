import { elements, elementStrings, displayDate } from './base';

export const renderCalcBox = () => {
  const markup = `<div class="calculations__box">
                    <ul class="calculations__list">
                    <div class="item-flights"></div>
                    <div class="item-accomodation"></div>
                    <div class="item-cars"></div>
                    <div class="item-food"></div>
                    <div class="item-entertainment"></li>
                    <div class="item-others"></div>
                    
                    </ul>
                    </div>`;
  elements.calcContainer.insertAdjacentHTML('afterbegin', markup);
};

export const cleanCalcBox = (item) => {
  document.querySelector(`.${item}`).innerHTML = '';
};

// FLIGHTS

const createSubitem = (flight) =>
  `<li class="calculations__subitem" id="nr-${flight.id}" > 
  <div class="result__thumb">
  <img class="result__img" src="${flight.img}" alt="${flight.carriers[0].name}">
</div>
                <a href="#" class="calculations__delete calculations__delete--big ${elementStrings.xFlight}">&times;</a>
                <p class="paragraph">
                    Route: <em> ${flight.origin} - ${flight.destination}  </em>
                </p>
                <p class="paragraph">
                    Departure: <em>${flight.depDate}, ${flight.depHours}:${flight.depMinutes}</em>
                </p>
                <p class="paragraph">
                    Arrival:<em> ${flight.arrivalDate}, ${flight.arrivalHours}:${flight.arrivalMinutes}</em>
                </p>
                <p class="paragraph">
                    Stops:<em> ${flight.stops === 0 ? 'direct' : flight.stops}</em>
                </p>
                <p class="paragraph">
                    Carriers:<em> ${flight.carriers}</em>
                </p>
                <p class="paragraph">
                    Duration:<em> ${flight.duration}</em>
                </p>
                <p class="paragraph">
                    Adults:<em> ${flight.adults} </em>
                </p>
                <p class="paragraph">
                    Children:<em> ${flight.children}</em>
                </p>
                <p class="paragraph">
                    Infants:<em>${flight.infants} </em>
                </p>
                <p class="paragraph">
                    Price:<strong> ${flight.price}€</strong>
                </p>
                <div class="calculations__note-box">
                ${
                  flight.note == ''
                    ? `<button class="btn btn__small btn--red add-note">Add note</button>`
                    : `<div class="calculations__note">
                <a href="#" id="xxdelete" class="calculations__delete calculations__delete--small">&times;</a>
                ${flight.note}
                </div>`
                }
                  
              </div>
            </li>`;

const createFlightItem = (subitems) =>
  `<li class="calculations__item"> 
                <div class="calculations__item-title">
                    <h3 class="heading-tertiary heading-flights">
                    <i class="fas fa-plane calculations__icon"></i>  Flights
                    </h3>
             </div> 
             <ul class="calculations__details calculations__active ${elementStrings.flightsList}">     
                ${subitems}
             </ul>
            </li>  `;

export const renderFlightsDetails = (selectedFlights) => {
  let subitems = '';

  selectedFlights.forEach((el) => (subitems += createSubitem(el)));

  let markup = createFlightItem(subitems);
  document.querySelector(`.${elementStrings.itemFlights}`).insertAdjacentHTML('beforeend', markup);
};

// HOTELS
const createHotelSubitem = (hotel) =>
  `<li class="calculations__subitem" id="nr-${hotel.id}" > 
            <div class="result__thumb">
            <img class="result__img2" src="${hotel.img}" alt="${hotel.name}">
          </div>
                          <a href="#" class="calculations__delete calculations__delete--big ${elementStrings.xHotel}">&times;</a>
                          <p class="paragraph">
                              Check-In: <em> ${displayDate(new Date(hotel.checkin))}  </em><br>
                          </p>
                          <p class="paragraph">
                          Check-Out: <em>  ${displayDate(new Date(hotel.checkout))}  </em><br>
                      </p>
                          <p class="paragraph">
                          Nights: <em> ${hotel.nights}   </em><br>
                          </p>
                          <p class="paragraph">
                          Adults:<em> ${hotel.adults} </em>
                      </p>
                      <p class="paragraph">
                          Children:<em> ${hotel.children}</em>
                      </p>
                     
          
                          <p class="paragraph">
                              Hotel: <em>${hotel.name}</em>
                          </p>
                          <p class="paragraph">
                              Star rating:<em>  ${hotel.stars} stars </em>
                          </p>
                          <p class="paragraph">
                          Guests rating: <i class="fa fa-star calculations__icon calculations__icon--yellow" aria-hidden="true"></i><em>  ${hotel.rating} / ${hotel.scale}</em>
                          </p>
                          <p class="paragraph">
                              Price (per night):<em> ${hotel.pricePerNight}</em>
                          </p>
                          <p class="paragraph">
                          Total cost:<strong> ${hotel.price}€</strong>
                      </p>
                      <p class="paragraph calculations__address">
                      Address: <em> ${hotel.address}</em>
                  </p>
                  <div class="calculations__note-box">
                  ${
                    hotel.note == ''
                      ? `<button class="btn btn__small btn--red add-note">Add note</button>`
                      : `<div class="calculations__note">
                  <a href="#" id="xxdelete" class="calculations__delete calculations__delete--small">&times;</a>
                  ${hotel.note}
                  </div>`
                  }
                    
                </div>
                      </li>`;

const createHotelItem = (subitems) =>
  `<li class="calculations__item"> 
        <div class="calculations__item-title">
            <h3 class="heading-tertiary heading-hotels">
            <i class="fas fa-bed calculations__icon"></i>  Hotels
            </h3>
    </div> 
    <ul class="calculations__details calculations__active ${elementStrings.hotelsList}">     
         ${subitems}
    </ul>
    </li>  `;

export const renderHotelsDetails = (selectedHotels) => {
  let subitems = '';

  selectedHotels.forEach((el) => (subitems += createHotelSubitem(el)));

  let markup = createHotelItem(subitems);
  document.querySelector(`.${elementStrings.itemHotels}`).insertAdjacentHTML('beforeend', markup);
};

// OTHER EXPENSES
const createOtherExpenseSubitem = (expense) =>
  `<li class="calculations__subitem" id="nr-${expense.id}" > 
              <a href="#" class="calculations__delete calculations__delete--big ${elementStrings.xOther}">&times;</a>
              <p class="paragraph">
                  Expense: <em> ${expense.expense}</em><br>
              </p>
              <p class="paragraph">
                  Total cost:<strong> ${expense.price}€ </strong>
              </p>
              <div class="calculations__note-box">
                ${
                  expense.note == ''
                    ? `<button class="btn btn__small btn--red add-note">Add note</button>`
                    : `<div class="calculations__note">
                <a href="#" id="xxdelete" class="calculations__delete calculations__delete--small">&times;</a>
                ${expense.note}
                </div>`
                }
                  
              </div>
          </li>`;

const createOtherExpenseItem = (subitems) =>
  `<li class="calculations__item"> 
            <div class="calculations__item-title">
            <h3 class="heading-tertiary heading-others">
                <i class="fas fa-coins calculations__icon"></i>  Other Expenses
            </h3>
            </div> 
            <ul class="calculations__details calculations__active ${elementStrings.othersList}">     
                ${subitems}
            </ul>
    </li>  `;

export const renderOtherExpensesDetails = (expenses) => {
  let subitems = '';

  expenses.forEach((el) => (subitems += createOtherExpenseSubitem(el)));

  let markup = createOtherExpenseItem(subitems);
  document.querySelector(`.${elementStrings.itemOthers}`).insertAdjacentHTML('beforeend', markup);
};

// FOOD SPENDING
const createFoodSpendingSubitem = (food) =>
  `<li class="calculations__subitem" id="nr-${food.id}" > 
              <a href="#" class="calculations__delete calculations__delete--big ${elementStrings.xFood}">&times;</a>
              <p class="paragraph">
                  Food spending for your ${food.travelStyle}, ${food.days}-days travel is: <br>
              </p>
              <p class="paragraph">
                  <strong> ${food.price}€ </strong>
              </p>
              <p class="paragraph calculations__address">
              <em>You are travelling to the country that is ${food.priceLevelMsg} your home country.</em>
              </p>
              <div class="calculations__note-box">
                ${
                  food.note == ''
                    ? `<button class="btn btn__small btn--red add-note">Add note</button>`
                    : `<div class="calculations__note">
                <a href="#" id="xxdelete" class="calculations__delete calculations__delete--small">&times;</a>
                ${food.note}
                </div>`
                }
                  
              </div>
          </li>`;

const createFoodSpendingItem = (subitems) =>
  `<li class="calculations__item"> 
            <div class="calculations__item-title">
            <h3 class="heading-tertiary heading-food">
                <i class="fas fa-utensils calculations__icon"></i>  Food
            </h3>
            </div> 
            <ul class="calculations__details calculations__active ${elementStrings.foodList}">     
                ${subitems}
            </ul>
    </li>  `;

export const renderFoodSpendingDetails = (foodCosts) => {
  let subitems = '';

  foodCosts.forEach((el) => (subitems += createFoodSpendingSubitem(el)));

  let markup = createFoodSpendingItem(subitems);
  document.querySelector(`.${elementStrings.itemFood}`).insertAdjacentHTML('beforeend', markup);
};

// CAR RENTAL

const createCarRentalSubitem = (car) =>
  `<li class="calculations__subitem" id="nr-${car.id}" > 
              <a href="#" class="calculations__delete calculations__delete--big ${elementStrings.xCar}">&times;</a>
              <p class="paragraph">
                  The total cost of your car rental with ${car.company} is: <br>
              </p>
              <p class="paragraph">
                  <strong> ${car.price}€ </strong>
              </p>
              
              <div class="calculations__note-box">
                ${
                  car.note == ''
                    ? `<button class="btn btn__small btn--red add-note">Add note</button>`
                    : `<div class="calculations__note">
                <a href="#" id="xxdelete" class="calculations__delete calculations__delete--small">&times;</a>
                ${car.note}
                </div>`
                }
                  
              </div>
          </li>`;

const createCarRentalItem = (subitems) =>
  `<li class="calculations__item"> 
            <div class="calculations__item-title">
            <h3 class="heading-tertiary heading-cars">
                <i class="fas fa-car calculations__icon"></i>  Car
            </h3>
            </div> 
            <ul class="calculations__details calculations__active ${elementStrings.carsList}">     
                ${subitems}
            </ul>
    </li>  `;

export const renderCarRentalCostDetails = (cars) => {
  let subitems = '';

  cars.forEach((el) => (subitems += createCarRentalSubitem(el)));

  let markup = createCarRentalItem(subitems);
  document.querySelector(`.${elementStrings.itemCars}`).insertAdjacentHTML('beforeend', markup);
};

// COMMON

export const addNote = (subitemId) => {
  const item = document.querySelector(`#${subitemId} .calculations__note-box`);
  const markup = `<textarea class="form__input form__input--yellow u-non-floated note-txt" name="note" rows="5" cols="33"> Add a note here..</textarea>
                  <div class="calculations__note-submit">
                    <button class="btn btn__small btn--red btn-add-note">Submit</button>
                  </div> 
                  `;
  item.innerHTML = markup;
};

export const getNote = (subitemId) => document.querySelector(`#${subitemId} .note-txt`).value;

export const submitNote = (subitemId, note) => {
  const item = document.querySelector(`#${subitemId} .calculations__note-box`);
  const markup = ` <div class="calculations__note">
                    <a href="#" id="xxdelete" class="calculations__delete calculations__delete--small">&times;</a>
                    ${note}
                    </div>
                    `;
  item.innerHTML = markup;
};

export const renderNoteBtn = (subitemId) => {
  const item = document.querySelector(`#${subitemId} .calculations__note-box`);
  const markup = ` <button class="btn btn__small btn--red add-note">Add note</button>`;
  item.innerHTML = markup;
};
