import Airport from './models/AirportSearch';
import Flights from './models/FlightSearch';
import * as airportSearchView from './views/airportSearchView';
import * as flightSearchView from './views/flightSearchView';
import { renderLoader, clearLoader, maxLogo, renderSearchBtns, clearResult, changeSearchTitle } from './views/searchView';
import { elements, displayNotification } from './views/base';
import { state } from './index';

////////////////////
// FLIGHTS SEARCH //
////////////////////

export const controlSkySearch = async () => {
  // 1) Get query from view
  const query = flightSearchView.getFlightInput();

  if (query) {
    // 2) New search object and add it to state
    state.foundFlights = new Flights(query);

    // 3) Prepare UI for results
    clearResult();
    renderLoader(elements.searchBox);

    try {
      // 4) Search for flights
      await state.foundFlights.searchTheSky();

      // 5) Create an object with all the flights details
      state.foundFlights.getDetails();
      state.flightsArr = state.foundFlights.flightsArr;

      // 6) Check if there are flights
      if (state.flightsArr.length > 0) {
        // 7) Render results on UI
        clearLoader();
        flightSearchView.renderFlights(state.flightsArr);
      } else {
        displayNotification('error', 'There are no flights matching your query :( Please try again.');
        clearLoader();
        maxLogo();
        changeSearchTitle('Search');
        renderSearchBtns();
      }
    } catch (err) {
      console.log(err);
      displayNotification('error', 'Something went wrong.. Please try again in few minutes');
      clearLoader();
      maxLogo();
      changeSearchTitle('Search');
      renderSearchBtns();
    }
  }
};

export const getAirportList = (inputId, list) => {
  // 1. Get input
  let input = document.getElementById(`${inputId}`);

  let timeout = null;

  // 2. Listen for keystroke events
  input.addEventListener('keyup', (e) => {
    // 3. Prevent task from executing if less than 1000ms
    clearTimeout(timeout);

    // 4. Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(async () => {
      try {
        // 5. Create airport object and find airports
        let airport = new Airport(input.value);
        await airport.findAirport();

        // 6. Display list of airposrts
        airportSearchView.showAirports(airport.result.locations, list);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  });
};
