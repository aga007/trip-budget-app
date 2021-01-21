// GLOBAL APP CONTROLLER
import '../sass/main.scss';
import '../images/logo-2x.png';
import '../images/logo-1x.png';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Budget from './models/Budget';
import * as searchCtrl from './searchCtrl';
import * as searchFlightCtrl from './searchFlightCtrl';
import * as searchHotelCtrl from './searchHotelCtrl';
import * as searchOtherCtrl from './searchOtherCtrl';
import * as searchFoodCtrl from './searchFoodCtrl';
import * as searchCarCtrl from './searchCarCtrl';
import * as calculationsCtrl from './calculationsCtrl';
import * as flightSearchView from './views/flightSearchView';
import * as hotelSearchView from './views/hotelSearchView';
import * as otherSearchView from './views/otherSearchView';
import * as foodSearchView from './views/foodSearchView';
import * as carSearchView from './views/carSearchView';
import * as calculationsView from './views/calculationsView';
import * as budgetView from './views/budgetView';
import * as stepsView from './views/stepsView';
import { minLogo, clearPagination, clearResult, changeSearchTitle } from './views/searchView';
import { elements, elementStrings, displayNotification, isEmpty } from './views/base';
import Flights from './models/FlightSearch';
import Calculations from './models/Calculations';

export const state = {};
//TESTING
//window.state = state;
state.budgetList = new Budget();

/**
 *  SEARCH CONTROLLER
 */

// RENDER SEARCH FORMS AND SEARCH FLIGHTS/HOTELS/CARS

window.addEventListener('click', (e) => {
  const btnFlight = e.target.closest(`.${elementStrings.btnFlight}`);
  const btnHotel = e.target.closest(`.${elementStrings.btnHotel}`);
  const btnCar = e.target.closest(`.${elementStrings.btnCar}`);
  const btnFood = e.target.closest(`.${elementStrings.btnFood}`);
  const btnOther = e.target.closest(`.${elementStrings.btnOther}`);
  const todaysDate = searchCtrl.getTodaysDate();
  const newTripBtn = e.target.closest(`.${elementStrings.newTripBtn}`);

  // FLIGHT SEARCH //

  if (btnFlight) {
    // 1. Prepare UI
    window.location.hash = 'section-search';
    clearResult();
    clearPagination();
    minLogo();

    // 2. Render flight search form
    changeSearchTitle('Search flight');
    flightSearchView.renderFlightSearchForm(todaysDate);

    // 3. Call find airport when user stops typing
    searchFlightCtrl.getAirportList('origin', 'origin-list');
    searchFlightCtrl.getAirportList('destination', 'destination-list');

    // 4. Get values from the form and search flights
    document.querySelector(`#${elementStrings.flightSearch}`).addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchCtrl.validateForm('origin', 'origin-list', 'origin airport') && searchCtrl.validateForm('destination', 'destination-list', 'destination airport')) {
        searchFlightCtrl.controlSkySearch();
      }
    });
  }
  // HOTEL SEARCH //
  else if (btnHotel) {
    // 1. Prepare UI
    window.location.hash = 'section-search';
    clearResult();
    clearPagination();
    minLogo();

    // 2. Render hotel search form
    changeSearchTitle('Search hotel');
    hotelSearchView.renderHotelSearchForm(todaysDate);

    // 3. Call find city when user stops typing
    searchHotelCtrl.getCityCodesList('destination');

    // 4. Get values from the form and search hotels
    document.querySelector(`#${elementStrings.hotelSearch}`).addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchCtrl.validateForm('destinationCity', 'destinationCity', 'city name') && searchCtrl.checkSecondDate()) {
        searchHotelCtrl.controlHotelSearch();
      }
    });
  }
  // CAR SEARCH //
  else if (btnCar) {
    // 1. Check is car rental costs have already been added
    if (state.cars) {
      displayNotification('info', "You've already added car rental costs. Would you like to add more?");
    }
    // 2. Prepare UI
    window.location.hash = 'section-search';
    clearResult();
    clearPagination();
    minLogo();

    // 3. Render car rental form
    changeSearchTitle('Search car');
    carSearchView.renderCarSearchForm();

    //4. Get values from the form and add car rental cost to calculations
    document.querySelector(`#${elementStrings.carSearch}`).addEventListener('submit', (e) => {
      e.preventDefault();
      searchCarCtrl.controlCarSearch();
    });
  }
  // ADD FOOD //
  else if (btnFood) {
    // 1. Check is food costs have already been added
    if (state.foodSpending) {
      displayNotification('info', "You've already added food spending. Would you like to add more?");
    }

    // 2. Prepare UI for the changes
    window.location.hash = 'section-search';
    clearResult();
    clearPagination();
    minLogo();

    // 3. Render other expense form
    changeSearchTitle('Food spending');
    foodSearchView.renderFoodSearchForm(todaysDate);

    // 4. Add number of people field
    searchCtrl.checkIfPricePerPerson();

    // 5. Get values from the form and add expense to calculations
    document.querySelector(`#${elementStrings.foodSearch}`).addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchCtrl.validateExpenseForm() && searchCtrl.checkSecondDate()) {
        searchFoodCtrl.controlFoodSearch();
      }
    });
  }
  // ADD OTHER EXPENSE //
  else if (btnOther) {
    // 1. Prepare UI
    window.location.hash = 'section-search';
    clearResult();
    clearPagination();
    minLogo();

    // 2. Render other expense form
    changeSearchTitle('Other expenses');
    otherSearchView.renderOtherSearchForm();

    // 3. Add number of people field
    searchCtrl.checkIfPricePerPerson();

    // 4. Get values from the form and add expense to calculations
    document.querySelector(`#${elementStrings.otherSearch}`).addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchCtrl.validateExpenseForm()) {
        searchOtherCtrl.controlOtherSearch();
      }
    });
  } else if (newTripBtn) {
    // Clear state and localStorage
    localStorage.clear();
    window.location.reload(true);
  }
});

// ADD PAGINATION

elements.searchBox.addEventListener('click', (e) => {
  const btn = e.target.closest(`.${elementStrings.redWhiteBtn}`);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    clearResult();
    clearPagination();
    if (btn.classList.contains('flights-pagination')) {
      flightSearchView.renderFlights(state.flightsArr, goToPage);
    } else if (btn.classList.contains('hotels-pagination')) {
      hotelSearchView.renderHotels(state.foundHotels, goToPage);
    }
  }
});

/**
 * CALCULATIONS CONTROLLER
 */

// ADD DETAILS TO CALC BOX
elements.searchBox.addEventListener('click', (e) => {
  const btnFlight = e.target.closest(`.${elementStrings.btnAddFlightDetails}`);
  const btnHotel = e.target.closest(`.${elementStrings.btnAddHotelDetails}`);
  // FLIGHT DETAILS
  if (btnFlight) {
    const id = btnFlight.dataset.getid;
    calculationsCtrl.addFlightDetails(id);
    window.location.hash = 'section-calculations';
  } else if (btnHotel) {
    // HOTEL DETAILS
    const id = btnHotel.dataset.getid;
    calculationsCtrl.addHotelDetails(id, state.foundHotels);
    window.location.hash = 'section-calculations';
  }
});

// ADD EVENT LISTENERS TO CALC BOX
elements.calcContainer.addEventListener('click', (e) => {
  if (e.target.matches(`.${elementStrings.xFlight}`)) {
    // DELETE FLIGHT ITEM
    calculationsCtrl.deleteFlightItem(e.target.parentNode.id);
  } else if (e.target.matches(`.${elementStrings.xHotel}`)) {
    // DELETE HOTEL ITEM
    calculationsCtrl.deleteHotelItem(e.target.parentNode.id);
  } else if (e.target.matches(`.${elementStrings.xOther}`)) {
    // DELETE OTHER EXPENSE ITEM
    calculationsCtrl.deleteOtherItem(e.target.parentNode.id);
  } else if (e.target.matches(`.${elementStrings.xFood}`)) {
    // DELETE FOOD SPENDING ITEM
    calculationsCtrl.deleteFoodItem(e.target.parentNode.id);
  } else if (e.target.matches(`.${elementStrings.xCar}`)) {
    // DELETE CAR RENTAL ITEM
    calculationsCtrl.deleteCarItem(e.target.parentNode.id);
  } else if (e.target.matches('.add-note, .add-note *')) {
    // ADD NOTE
    const subitemId = e.target.parentNode.parentNode.id;

    // 1. Render textarea to add note
    calculationsView.addNote(subitemId);

    // 2. Get data from textarea and display it on UI

    document.querySelector(`.${elementStrings.addNoteBtn}`).addEventListener('click', (e) => {
      calculationsCtrl.submitNote(subitemId);
    });

    // Do the same on ENTER
    let fired = false;
    let w = parseInt(window.innerWidth);
    if (w >= 900) {
      document.addEventListener('keydown', (e) => {
        if (e.isComposing || e.keyCode === 13) {
          if (!fired) {
            fired = true;
            calculationsCtrl.submitNote(subitemId);
          }
        }
      });
    }
  } else if (e.target.matches(`.${elementStrings.xsdelete}`)) {
    // REMOVE NOTE
    const subitemId = e.target.parentNode.parentNode.parentNode.id;
    calculationsCtrl.removeNote(subitemId);
  } else if (e.target.matches(`.${elementStrings.calcItemTitle}, .${elementStrings.calcItemTitle} *`)) {
    // TOGGLE ITEM DETAILS
    const title = e.target.closest(`.${elementStrings.calcItemTitle}`);
    const title2 = title.firstElementChild;
    const title2Class = title2.classList;

    if (title) {
      const titleClass = title.firstElementChild.classList.item(1);
      calculationsCtrl.toggleDetails(titleClass);
    }
  }
});

/**
 * BUDGET (LIST) CONTROLLER
 */
window.addEventListener('click', (e) => {
  const btnList = e.target.closest(`#${elementStrings.budgetBtn}`);
  if (e.target.matches('.btn__active')) {
    budgetView.clearList();
  } else if (btnList) {
    if (state.budgetList.budget) {
      budgetView.clearList();
      elements.budgetList.classList.remove('list__hidden');
      document.querySelector(`#${elementStrings.budgetBtn}`).classList.add('btn__active');
      budgetView.renderBudgetList(state.budgetList.expenses, state.budgetList.budget);
    } else {
      displayNotification('info', "You didn't add any expenses yet. Please add some.");
    }
  } else if (e.target.matches(`.${elementStrings.listHide}`)) {
    budgetView.clearList();
  } else if (e.target.matches('#print-budget-list')) {
    budgetView.printBudgetList('budget-list');
  }
});

/**
 * RESTORE CALCULATIONS AND BUDGET DATA ON LOAD
 */

window.addEventListener('load', () => {
  state.calcList = new Calculations();

  // Restore data
  state.calcList.readStorage();

  // Render existing data
  if (!isEmpty(state.calcList)) {
    // 4. Render calcBox
    calculationsView.renderCalcBox();
    if (state.calcList.flights.length > 0) {
      calculationsView.renderFlightsDetails(state.calcList.flights);
    }
    if (state.calcList.hotels.length > 0) {
      calculationsView.renderHotelsDetails(state.calcList.hotels);
    }
    if (state.calcList.others.length > 0) {
      calculationsView.renderOtherExpensesDetails(state.calcList.others);
    }
    if (state.calcList.food.length > 0) {
      calculationsView.renderFoodSpendingDetails(state.calcList.food);
    }
    if (state.calcList.cars.length > 0) {
      calculationsView.renderCarRentalCostDetails(state.calcList.cars);
    }
  }

  // Calculate and display budget
  state.budgetList.readStorage();
  state.budgetList.calculateBudget();
  budgetView.displayBudget(state.budgetList.budget);
  budgetView.renderBudgetList(state.budgetList.expenses, state.budgetList.budget);
});

/**
 * STEPS NAVIGATION CONTROLLER
 */

elements.handle.addEventListener('click', () => {
  stepsView.toggleNavigation();
});

window.addEventListener('click', (e) => {
  const btnSteps = e.target.closest(`.${elementStrings.steps}`);
  if (btnSteps) {
    stepsView.toggleNavigation();
  }
});

// Needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
